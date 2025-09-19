import { useState, useEffect } from "react"
import { TarefaComponent } from "./components/TarefaComponent";
import "./App.css"

export function App() {
  const [nome, setNome]= useState<string>('');
  const [listaTarefa, setListaTarefa]= useState<string[]>([]);
  
  useEffect(()=>{
    const tarefasSalvas = localStorage.getItem('tarefas');
    setListaTarefa(tarefasSalvas ? JSON.parse(tarefasSalvas) : []);
  },[])
  function criarTarefa(){
    if(nome.trim().length === 0){
      alert('O nome não pode ser vazio');
      return;
    }
    if(nome.length < 5){
      alert('O nome tem que ter (5) caracteres no mínimo');
      return;
    }
    const tarefasAtualizadas = [...listaTarefa, nome];
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
    setListaTarefa(tarefasAtualizadas);
    setNome('');
  }
  function deletarTarefa(index: number){
    const novaLista = listaTarefa.filter((_, i) => i !== index);
    localStorage.setItem("tarefas", JSON.stringify(novaLista));
    setListaTarefa(novaLista);
  }
  function atualizarTarefa(index: number, novoNome: string){
    const novaLista = listaTarefa.map((tarefa, i) => {
      if(i === index){
        return novoNome;
      }
      return tarefa;
    });
    localStorage.setItem('tarefas', JSON.stringify(novaLista));
    setListaTarefa(novaLista);
  }
  return (
    <main>
      <div>
        <input 
        placeholder="Digite o nome" 
        type="text" name="name"
        onKeyUp={(e)=>{
          if(e.key === 'Enter'){
            criarTarefa();
          }
        }}
        value={nome}
        onChange={e => setNome(e.target.value)}
        />
        <button onClick={criarTarefa}>Criar Tarefa</button>
      </div>
      <section>
        <ul>
          {listaTarefa.length > 0 ? listaTarefa.map((tarefa, index) => (
            <TarefaComponent deletartarefa={deletarTarefa}index={index}atualizarTarefa={atualizarTarefa} key={index} nome={tarefa} />            
          )) : <p>Não há tarefas</p>}
        </ul>
      </section>
    </main>
  )
}