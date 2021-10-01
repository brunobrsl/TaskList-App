import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import estilosComuns from '../estilosComuns'

export default props => {

    const concluidoOuNaoStyle = props.concluir != null ?
        { textDecorationLine: 'line-through' } : {}

    const data = props.concluir ? props.concluir : props.estimar
    const dataFormatada = moment(data).locale('pt-br').format('dddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#FFF' style={styles.excluirIcone} />
                <Text style={styles.excluirTexto}>Excluir</Text>
            </View>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.botaoTarefa(props.id)}>
                    <View style={styles.checkBox}>
                        {getCheckBox(props.concluir)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.descricao, concluidoOuNaoStyle]}>{props.descricao}</Text>
                    <Text style={styles.data}>{dataFormatada}</Text>
                </View>
            </View>
        </Swipeable>   
    )
}

function getCheckBox(concluir) {
    if(concluir != null) {
        return (
            <View style={styles.concluido}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pendente}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkBox: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pendente: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    concluido: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#003F7F',
        alignItems: 'center',
        justifyContent: 'center'
    },
    descricao: {
        color: estilosComuns.cores.textoPrincipal,
        fontSize: 15
    },
    data: {
        color: estilosComuns.cores.subTexto,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excluirIcone: {
        marginLeft: 10
    },
    excluirTexto: {
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
});