import {useRef, useState } from "react";
type TarefaProps={
  nome : string,
  index: number,
  atualizarTarefa: (index: number, novoNome: string) => void,
  deletartarefa: (index: number) => void
}
export function TarefaComponent({
    nome,
    index,
    atualizarTarefa,
    deletartarefa
}: TarefaProps) {
const [novoNome, setNovoNome] = useState<string>(nome);
const dialogRef = useRef<HTMLDialogElement | null>(null);

  function abrirModal() {
    dialogRef.current?.showModal();
  }
  function fecharModal() {
    dialogRef.current?.close()
  }
  function handleAtualizar() {
    atualizarTarefa(index, novoNome);
    fecharModal();
  }
    return (
    <li>
     <p>
        {nome}
     </p>
    <button className="deletar"onClick={() => deletartarefa(index)}>Deletar</button>
    <button onClick={abrirModal}>Atualizar</button>
    <dialog ref={dialogRef}>
        <h3>Atualizar o usuário</h3>
        <input type="text" value={novoNome} onChange={(e)=> setNovoNome(e.target.value)} />
        <button onClick={handleAtualizar}>Atualizar</button>
        <button onClick={fecharModal}>Fechar</button>
    </dialog>
    </li>
  )
}