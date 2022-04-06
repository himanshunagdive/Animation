import React from 'react';
import { StyleSheet, Text, View,Image,Animated,InteractionManager} from 'react-native';


class TimeBar extends React.Component {
    constructor(props) {
        super(props);
       this.state = {
           barWidth: new Animated.Value(0),
           color:'#ccc',
           active:props.active,
           stop:props.stop
        }
      }

    static getDerivedStateFromProps(props, state) {

     if((props.active!=state.active ) && !props.stop)
    {
            if(props.active==props.index)
            {
                Animated.timing(
                    state.barWidth,
                    {
                    toValue: 100,
                    duration: 3000,
                    }
                ).start(()=>{
                    if(props.index==props.active){

                        InteractionManager.runAfterInteractions(() => {
                                props.change(props.index);
                            });
                        }
                });
            }

            if(props.index<props.active)
            {
                return {color:'#fff',active:props.active}
            }
        return {active:props.active};
     }
        if(props.stop!=state.stop){
            if(props.stop){
      //     alert("stop--",state.active+"a");
                Animated.timing(
                    state.barWidth
                ).stop();

            }
            else{
                if((props.active==props.index) )
                {
                Animated.timing(
                    state.barWidth,
                    {
                    toValue: 100,
                    duration: 2000,
                    }
                ).start(()=>{
                    if(props.index==props.active){

                        InteractionManager.runAfterInteractions(() => {
                                props.change(props.index);
                            });
                        }
                });
            }
        }
        return {stop:props.stop};
    }

    }

    animate(){
        Animated.timing(
            this.state.barWidth,
            {
              toValue: 100,
              duration: 3000,
            }
          ).start();
    }
    stop(){
        Animated.timing(
            this.state.barWidth
          ).stop();
    }

    render(){
        let { barWidth,time} = this.state;
        let barTheme=['#3023ae','#966dd7']

    return (

         <View style={[styles.barOuter,{backgroundColor:this.state.color}]}>
         <Animated.View style={[styles.barInner,{width:barWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
            })
            }]}>

            </Animated.View>
        </View>

    );
  }
}
const styles = StyleSheet.create({

container:{
    flexDirection:'row',
    marginBottom:15,
    alignItems:'center',

},
barOuter:{
    flex:1,
    height:4,
    borderRadius:4,
    backgroundColor:'#ccc',
    overflow:'hidden',
    marginRight:3

},
iconTimeGlass:{
    height:14,
    width:10,
    marginLeft:7,
    marginRight:4
},
time:{
    fontSize:18,
    fontFamily:"Lato-Bold",
    color:"#45258e"
},
barInner:{
    backgroundColor:'#fff',
    height:'100%',
    borderRadius:4
},
barFill:{
    width:'100%',
    height:'100%',
    borderRadius:4
}

});

export default TimeBar;
