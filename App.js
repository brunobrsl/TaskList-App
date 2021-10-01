import React, { Component } from 'react'
import { 
    Text,
    View, 
    ImageBackground, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Platform, 
    Alert
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import Logo from './assets/imgs/logo.jpg'
import estilosComuns from './estilosComuns'

import Task from './components/Tarefa'
import AddTask from './AdicionarTarefa'

const estadoInicial = { 
    mostrarTarefasConcluidas: true,
    mostrarAdicionarTarefa: false,
    tarefasVisiveis: [],
    tarefas: []    
}

export default class App extends Component {
    state = { 
        ...estadoInicial
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('state')
        const state = JSON.parse(stateString) || estadoInicial
        this.setState(state, this.filtrarTarefas)
    }

    botaoMostarTarefasConcluidas = () => {
        this.setState({ mostrarTarefasConcluidas: !this.state.mostrarTarefasConcluidas }, this.filtrarTarefas)
    }

    filtrarTarefas = () => {
        let tarefasVisiveis = null
        if(this.state.mostrarTarefasConcluidas) {
            tarefasVisiveis = [...this.state.tarefas]
        } else {
            const pendente = function(tarefa) {
                return tarefa.concluir === null
            }
            tarefasVisiveis = this.state.tarefas.filter(pendente)
        }

        this.setState({ tarefasVisiveis })
        AsyncStorage.setItem('state', JSON.stringify(this.state))
    }

    botaoTarefa = tarefaId => {
        const tarefas = [...this.state.tarefas]
        tarefas.forEach(tarefa => {
            if(tarefa.id === tarefaId) {
                tarefa.concluir = tarefa.concluir ? null : new Date()
            }
        })

        this.setState({ tarefas }, this.filtrarTarefas)
    }

    adicionarTarefa = novaTarefa => {
        if(!novaTarefa.descricao || !novaTarefa.descricao.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

        const tarefas = [...this.state.tarefas]
        tarefas.push({
            id: Math.random(),
            descricao: novaTarefa.descricao,
            data: novaTarefa.data
        })

        this.setState({ tarefas, mostrarAdicionarTarefa: false }, this.filtrarTarefas)
    }

    deletarTarefa = id => {
        const tarefas = this.state.tarefas.filter(tarefa => tarefa.id !== id)
        this.setState({ tarefas }, this.filtrarTarefas)
    }

    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <AddTask visivel={this.state.mostrarAdicionarTarefa} onCancel={() => this.setState({ mostrarAdicionarTarefa: false })} onSave={this.adicionarTarefa} />
                <ImageBackground source={Logo} style={styles.background} >
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.botaoMostarTarefasConcluidas}>
                            <Icon name={this.state.mostrarTarefasConcluidas ? 'eye' : 'eye-slash'} size={20} color={estilosComuns.cores.secundario} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Lista de Tarefas</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.tarefasVisiveis} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Task {...item} botaoTarefa={this.botaoTarefa} onDelete={this.deletarTarefa} />} />
                </View>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => this.setState({ mostrarAdicionarTarefa: true })}>
                    <Icon name="plus" size={20} color={estilosComuns.cores.secundario} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        color: estilosComuns.cores.secundario,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        color: estilosComuns.cores.secundario,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: estilosComuns.cores.primario,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
