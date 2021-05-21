import './App.css';
import {useState, useEffect} from 'react';
import reactDom from 'react-dom';

function App() {

  const [tarefas, setarTarefas] = useState([
    /*
    {
      id:0,
      tarefa:'Minha tarefa do dia',
      finalizada:false
    },
    {
      id:1,
      tarefa:'Minha tarefa do dia',
      finalizada:true
    }
    */

  ]);
  const [modal, setModal] = useState(false);

  const salvarTarefa = () => {
    // TO Do: Salvar a tarefa.
    var tarefa = document.getElementById('content-tarefa');

    //adicionando um array
    setarTarefas([
      //os 3 pontos recuperam tudo o que há dentro do array e coloca
      //o que tiver depois da vírgula logo depois, pode ser o inverso também
      ...tarefas,
      {
        //criando um id apartir da hora atual, para ser único sempre
        id: new Date().getTime(),
        tarefa: tarefa.value,
        finalizada: false
      }
    ]);

    //armazenar as tarefas no storage local
    //colocando em JSON, como strings, para possibilitar a recuperação fácil
    //recuperar todas as tarefas sem ter que ter um load adicional, através do
    //... tarefas
    window.localStorage.setItem('tarefas', JSON.stringify([...tarefas,
      {
        //criando um id apartir da hora atual, para ser único sempre
        id: new Date().getTime(),
        tarefa: tarefa.value,
        finalizada: false
      }
    ]));

    setModal(false);

  }

  const marcarConcluida = (id, opt) => {
    let novasTarefas = tarefas.filter(function(val){
      if (val.id == id){
        val.finalizada = opt;
      }

      return val;
    })

    setarTarefas(novasTarefas);
    //armazenar tarefas concluídas
    //colocando em JSON, como strings, para possibilitar a recuperação fácil
    window.localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  }

  const abrirModal = () => {
    //modal é uma maneira de abrir uma view acima da página inicial
    //ou seja, uma janela em cima da view princial do site
    //abrir modal acontece baseado no estado
    setModal(!modal);
  }

  const deletarTarefa = (id)=>{
    let novasTarefas = tarefas.filter(function(val){
      if (val.id != id){
        return val;
      }

  })
  setarTarefas(novasTarefas);

}

   // \/ Usado para fazer uma chamada para API e preencher o estado tarefas 
  useEffect(()=>{
    //recuperar os itens do storage
    if(window.localStorage.getItem('tarefas') != undefined){
      //JSON.parse vai recuperar uma string JSON e transformar em um objeto de novo
      setarTarefas(JSON.parse(window.localStorage.getItem('tarefas')));
    }
  },[])

  return (
    <div className="App">

      {
        //quando essas chaves são utilizadas são como uma função if
        //que exigem os dois pontos ( : ) como segunda opção
        modal?
        //Se a modal for true acontece isso:
        <div className="modal">
          <div className="modalContent">
            <div className="titulo">
              <h3>Adicionar sua tarefa</h3>
              <span onClick={()=>abrirModal()}>X</span>
            </div>
            <input id="content-tarefa" type="text"></input>
            <button onClick={()=>salvarTarefa()}>Salvar!</button>
          </div>
        </div>
        //Se não for true acontece isso:
        :
        <div></div>
      }

      <div onClick={()=>abrirModal()} className="addTarefa">+</div>
      <div className="boxTarefas">
        <h2>Minhas tarefas do dia!</h2>
        {
          tarefas.map((val)=>{
            if(!val.finalizada){
              return(
                <div className="tarefaSingle">
                <p onClick={()=>marcarConcluida(val.id, true)}>{val.tarefa}</p>
                <span onClick={()=>deletarTarefa(val.id)} style={{color:'red'}}>X</span>
                </div>
              );
            }else{
              return(
                <div className="tarefaSingle">
                <p onClick={()=>marcarConcluida(val.id, false)} style={{textDecoration:'line-through'}}>{val.tarefa}</p>
                <span onClick={()=>deletarTarefa(val.id)} style={{color:'red'}}>X</span>
                </div>
              )
            }
          })
        }

      </div>
    </div>
  );
}

export default App;

// para iniciar a aplicação somente para si: ir para o cmd, na pasta do projeto
// digitar "npm start"
// relaxa, demora um pouco normalmente

// para dar host através do firebase: cmd, na pasta do projeto, dar "npm run build"
// depois dar "firebase deploy", 