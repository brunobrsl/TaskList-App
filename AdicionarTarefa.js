import React, { Component } from 'react'
import { 
    Modal, 
    View, 
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback 
} from 'react-native'

import estilosComuns from './estilosComuns'

const estadoInicial = { descricao: '', data: new Date() }

export default class AdicionarTarefa extends Component {

    state = {
        ...estadoInicial
    }

    salvar = () => {
        const novaTarefa = {
            descricao: this.state.descricao,
            data: new Date()
        }

        this.props.onSave && this.props.onSave(novaTarefa)
        this.setState({ ...estadoInicial })
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.visivel} onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} placeholder="Informe a Descrição..." onChangeText={descricao => this.setState({ descricao })} value={this.state.descricao} />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.salvar}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: estilosComuns.cores.primario,
        color: estilosComuns.cores.secundario,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6 
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: estilosComuns.cores.primario
    }
})