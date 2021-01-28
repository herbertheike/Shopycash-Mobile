import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert, RefreshControl } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Header } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { TouchableNativeFeedbackBase } from 'react-native';



export default class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectAll: false,
			cartItemsIsLoading: false,
			cartItems: [],
			refreshing: false
		}
	}

	componentDidMount ()
  {

			AsyncStorage.getItem('cart').then((cart)=>{
			if (cart !== null) {
				// We have data!!
				const cartgoods = JSON.parse(cart)
				this.setState({cartItems:cartgoods})
				
			}
			})
			.catch((err)=>{
			alert(err)
    })
  }
	
	selectHandler = (index, value) => {
		const newItems = [...this.state.cartItems]; // clone the array 
		newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
		this.setState({ cartItems: newItems }); // set new state
	}
	
	selectHandlerAll = (value) => {
		const newItems = [...this.state.cartItems]; // clone the array 
		newItems.map((item, index) => {
			newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
		});
		this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
	}
	
	
	deleteHandler =  (index) => {
		Alert.alert(
			'Are you sure you want to delete this item from your cart?',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: async() => {
					//let updatedCart = this.state.cartItems; /* Clone it first */
					this.state.cartItems.splice(index, 1); /* Remove item from the cloned cart state */
					//this.setState({cartItems: updatedCart}); /* Update the state */
					console.log(this.state.cartItems)
					await AsyncStorage.setItem('cart',JSON.stringify(this.state.cartItems))
					this.onRefresh();
				}},
			],
			{ cancelable: false }
		);
	}
	
	quantityHandler = (action, index) => {
		const newItems = [...this.state.cartItems]; // clone the array 
		
		let currentQty = newItems[index]['qty'];
		
		if(action == 'more'){
			newItems[index]['qty'] = currentQty + 1;
		} else if(action == 'less'){
			newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1;
		}
		
		this.setState({ cartItems: newItems }); // set new state
	}
	
	subtotalPrice = () => {
		const { cartItems } = this.state;
		if(cartItems){
			return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.price : 0), 0 );
		}
		return 0;
	}

	wait = (timeout) => {
		return new Promise(resolve => {
		  setTimeout(resolve, timeout);
		});
	  }

	  onRefresh = async () => {
		this.setState({refreshing: true});
		AsyncStorage.getItem('cart').then((cart)=>{
			if (cart !== null) {
				// We have data!!
				const cartgoods = JSON.parse(cart)
				this.setState({cartItems:cartgoods})
				
			}
			})
			.catch((err)=>{
			alert(err)
    })
		this.wait(2000).then(() => this.setState({refreshing: false}));
	  };
	
	
	
	render() {
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
		});
		
		const { cartItems, cartItemsIsLoading, selectAll } = this.state;
		
		return (
			<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
				 <Header
                statusBarProps={{ barStyle: "light-content" }}
                barStyle="light-content"
                centerComponent={{
                style: {
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: 20,
                    fontFamily: "Roboto",
                },
                },
                <Text
                    style={{ fontWeight: "bold", color: "#53aaa8", fontSize: 13 }}
                >
                    Carrinho de compras
                </Text>
            }
                containerStyle={{
                backgroundColor: "#ffffff",
                justifyContent: "space-around",
                }}
      />
				
				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="#ef5739" />
						
					</View>
				) : (
					<ScrollView
					refreshControl={
						<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
					  }>	
						{cartItems && cartItems.map((item, i) => (
							<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandler(i, item.checked)}>
										<Icon name={item.checked == 1 ? "check-square" : "square"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
									</TouchableOpacity>
								</View>
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/}} style={{paddingRight: 10}}>
										<Image source={{uri: item.imagem}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
									</TouchableOpacity>
									<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
										<Text numberOfLines={1} style={{fontSize: 15}}>{item.name}</Text>
										<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.categoria ? 'Categoria: ' + item.categoria : ''}</Text>
                    <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>R${item.qty * item.price}</Text>
										<View style={{flexDirection: 'row'}}>
											
											<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>Quantidade: {item.qty}</Text>
											
										</View>
									</View>
									
								</View>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.deleteHandler(i)}>
										<Icon name="trash-alt" size={25} color="#ee4d2d" />
									</TouchableOpacity>
								</View>
							</View>
						))}
					</ScrollView>
				)}
				
				{!cartItemsIsLoading &&
					<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<View style={[styles.centerElement, {width: 32, height: 32}]}>
									<Icon    name="ticket-alt" size={25} color="#f0ac12" />
								</View>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Cupom</Text>
								<View style={{paddingRight: 20}}>
									<TextInput 
										style={{paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4}} 
										placeholder="Digite codigo do cupom" 
										value={''}
										onChangeText={(searchKeyword) => {
											
										} }
									/> 
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandlerAll(selectAll)}>
									<Icon name={selectAll == true ? "check-square" : "square"} size={25} color={selectAll == true ? "#0faf9a" : "#aaaaaa"} />
								</TouchableOpacity>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Selecionar tudo</Text>
								<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
									<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
									<Text>R${this.subtotalPrice().toFixed(2)}</Text>
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
							<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5}]} onPress={() => console.log('test')}>
								<Text style={{color: '#ffffff'}}>Checkout</Text>
							</TouchableOpacity>
						</View>
					</View>
				}
			</View>
		);
	}
}