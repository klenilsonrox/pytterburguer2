'use client'
import { FaShoppingCart } from "react-icons/fa";
import React, { useRef } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { dadosContext } from "../../components/DadosProvider";



function page() {
  const inf = React.useContext(dadosContext);
  const [total, setTotal] = React.useState("");
  const [contador, setContador] = React.useState(1);
  const [isOpen,setIsOpen]=React.useState(false)
  const [cartIsOpen,setCartIsOpen]=React.useState(false)
  const [dados,setDados]=React.useState([])
  const[nome,setNome]=React.useState("")
  const[rua,setRua]=React.useState("")
  const[numero,setNumero]=React.useState("")
  const[bairro,setBairro]=React.useState("")
  const[complemento,setComplemento]=React.useState("")
  const[pagamento,setPagamento]=React.useState("")
  const[troco,setTroco]=React.useState("")
  const [opcaoSelecionada, setOpcaoSelecionada] = React.useState('');
  const [checkout,setOpenCheckout]=React.useState(false)
  const [error,setError]=React.useState("")
  const ref = useRef()
 const [fechado,setFechado]=React.useState(false)

  function finalizarCompra(){
    clearTimeout(ref.current)
    if(nome===""){
      setError("o nome é obrigatório")
      ref.current  = setTimeout(()=>{
        setError("")
      },1500)
      return 
    }



   if(opcaoSelecionada===""){
    ref.current  = setTimeout(()=>{
      setError("")
    },1500)
    setError("Selecione Buscar ou Delivery")
   }
    if(pagamento ==="Dinheiro" && troco===""){
      ref.current  = setTimeout(()=>{
        setError("")
      },1500)
      setError("preencha o campo de troco, nao precise, coloque 'NÂO PRECISA'")
      return
    }
    if(opcaoSelecionada==="delivery" && rua===""){
      setError("preencha o nome da sua rua")
      ref.current  = setTimeout(()=>{
        setError("")
      },1500)
      return 
    }
    if(opcaoSelecionada==="delivery" && numero===""){
      setError("preencha o número da sua casa")
      ref.current  = setTimeout(()=>{
        setError("")
      },1500)
      return
    }
    if(opcaoSelecionada==="delivery" && bairro===""){
      setError("preencha o nome do seu bairro")
      ref.current  = setTimeout(()=>{
        setError("")
      },1500)
      return
    }
    if(pagamento==="Dinheiro" && troco===""){
      setError("preencha o campo troco, caso nao precise, coloque 'NAO PRECISA' ")
      ref.current  = setTimeout(()=>{
        setError("")
      },1500)
      return
    }

    const dados=`
Nome do Cliente: ${nome}\n    
*Entrega* : ${opcaoSelecionada==="buscar" ? `cliente vai buscar`:"delivery"}
${opcaoSelecionada==="delivery" ? `*Numero:* ${numero}`:""}
${opcaoSelecionada==="delivery" ? `*Bairro:* ${bairro}`:""}
${opcaoSelecionada==="delivery"  ? `*Complemento*: ${complemento}`:"" }
${complemento !=="" ? `*Complemento*: ${complemento}`:"" }
${opcaoSelecionada==="delivery" ? `*Forma de pagamento*: ${pagamento}`:""}
${pagamento==="Dinheiro" ? `*Precisa* *de* *troco:*${troco} `:""} 
"----------------------------------------------------"
`
const infosPagamento = `
*subTotal* : R$ ${Number(total).toFixed(2)}
*Taxa R$* : ${Number(opcaoSelecionada==="delivery" ? 3:0).toFixed(2)}
*total do Pedido R$* : ${Number(total + Number(opcaoSelecionada==="delivery" ? 3:0)).toFixed(2)}
`
 const cartItems = inf.cart.map((item)=> {
      return (
`*Produto* :${item.quantidade} ${item.produto} \n 
*Preço unitário:* ${item.preco}\n  
"----------------------------------------------------"
\n`)
}).join("")

    const dadosClient= encodeURIComponent(dados)
    const produtos= encodeURIComponent(cartItems)
    const infospag= encodeURIComponent(infosPagamento)
    const phone = "+5531992311170"

    window.open(`https://wa.me/${phone}?text=${dadosClient}${produtos}${infospag}`)
    
    fecharSite()

  }

function fecharSite(){
  setTimeout(()=>{
    window.open("/")
  },2000)
}





  const handleSelecionarOpcao = (opcao) => {
    setOpcaoSelecionada(opcao);
  };
 

  function aumentar() {
    setContador(contador => contador + 1); // Incrementa o contador
  }

  function diminuir(index) {
    const updatedCart = [...inf.cart];
    updatedCart[index].quantidade--; // Diminui a quantidade do item
  
    if (updatedCart[index].quantidade === 0) {
      // Se a quantidade do item for 0, remove o item do carrinho
      updatedCart.splice(index, 1);
    }
  
    inf.setCart(updatedCart); // Atualiza o carrinho com as alterações
  }

  function addnoCarrinho(item, quantidade) {
    verificarhorario()
    const itemExistIndex = inf.cart.findIndex(it => it.produto === item.produto);

    if (itemExistIndex !== -1) {
      // Se o item já existe no carrinho, atualiza a quantidade
      const updatedCart = [...inf.cart];
      updatedCart[itemExistIndex] = {
        ...updatedCart[itemExistIndex],
        quantidade: updatedCart[itemExistIndex].quantidade + quantidade
      };
      inf.setCart(updatedCart);
    } else {
      // Se o item não existe no carrinho, adiciona ao carrinho com quantidade informada
      inf.setCart(prevCart => [...prevCart, { ...item, quantidade }]);
    }
    // Reseta o contador
    setContador(1);
    inf.setOpenModal(false)
  }

  function verificaCart(){
    
    if(inf.cart.length > 0){
      setCartIsOpen(true)
    } else{
      setCartIsOpen(false)
      setIsOpen(false)
    }
  }

  React.useEffect(()=>{
    const filtrados = inf.dados.filter(it=>it.categoria==="sanduiches")
    setDados(filtrados)
    const valor = inf.cart.reduce((acc,item)=> acc + Number(item.preco) * item.quantidade,0)
    setTotal(valor)
    verificaCart()
  },[inf.cart])

 

  function abrirCart(){
   setIsOpen((open)=>!open)
  }

  function closeCart(e){
    if(e.target.id==="carrinho"){
      setIsOpen(false)
    }
   }

   function addAndRemoveAtivo(e){
    let allCat = [...document.querySelectorAll(".cat")]

    allCat.forEach(it=> {
      it.classList.remove("ativo")
    } )

    if(e.target.id==="tudo"){
      setDados(inf.dados)
    }

    if(e.target.classList.contains("cat"))
    e.target.classList.add("ativo")
const filtrados = inf.dados.filter(it=>it.categoria===e.target.id)
    setDados(filtrados)
   }
   
  function closeModal(e){
    if(e.target.id==="modalItems"){
      inf.setOpenModal(false)
    }
  }

  function verificarhorario(){
    console.log("jjj")
  }
   
  

  return (
    <div className="h-auto">
      <header className="py-6 border-b fixed top-0 left-0 right-0 z-10 bg-white bg-center bg-cover bg-home flex items-center justify-center h-[320px]">
        <nav className="flex w-screen mx-auto justify-center flex-col items-center px-4 relative bg-black bg-opacity-80 h-[320px]">
        <img src="/images/logopng.png" alt="logo" className="max-w-[200px]" />
          <div className="flex flex-col items-center relative top-[-30px]">
          <h1 className="text-white font-bold text-2xl relative">Pytter Burguer</h1>
          <p className="text-white">Av. Armando Franco, 141 - Centro, Bambuí - MG</p>
          <p className="text-white bg-green-600 py-2 px-6 rounded-md mt-2">Terça a Domingo das 18:00 as 00:00</p>
          <div className="my-2 mb-4 flex gap-2 items-center9">
          <a href="https://matalarica.page.link/pytterburguer" target="_blanck"><img src="/images/matalarica.png" alt="logo matalarica" className="max-w-[40px]"/></a>
          <a href="https://wa.link/kccygt" target="_blanck"><img src="/images/whatsapp.webp" alt="logo whatsapp" className="max-w-[43px]"/></a>
          </div>
          </div>
          <nav>
              {cartIsOpen && <div className=" text-white cursor-pointer fixed lg:bottom-4 bottom-0 mx-auto left-0 right-0  flex w-screen items-center" onClick={abrirCart}>
                <div className="flex justify-between w-screen max-w-md mx-auto rounded-md bg-red-600 p-4">
                <div className="flex gap-2 items-center">
                <p>R$ {Number(total).toFixed(2)}</p> /
                <p>( {inf.cart.length} ) {inf.cart.length > 1 ? "itens" : "item"}</p>
                </div>
                <p className="flex items-center gap-2">Ver meu carrinho <FaShoppingCart /></p>
                </div>
              </div>}        
          </nav>
        </nav>
      </header>

      {isOpen && <div className="inset-0 fixed bg-black bg-opacity-30 flex items-center justify-center backdrop-blur-sm p-4 mt-4 mb-4 z-50" id="carrinho" onClick={closeCart}>
<div className="bg-white w-screen max-w-md rounded-md overflow-hidden mt-10 mb-6">

  <div className="flex justify-between border-b py-4 px-2 bg-slate-500 text-white ">
    <h1 className="text-xl font-bold">itens no Carrinho:</h1>
    <button onClick={()=>setIsOpen(false)}>X</button>
  </div>

<div className="h-screen max-h-[300px] sm:max-h-[460px] overflow-y-scroll flex flex-col gap-2 mb-4">
  {inf.cart.map((it,index)=> (
    <div className="px-2 border-b flex justify-between gap-2 mt-8">
    <div className="flex flex-col border-r pr-2 flex-1 w-screen ">
      <small className="font-bold">Produto</small>
      <p> <span className="text-red-600 font-semibold">({it.quantidade})</span> - {it.produto} </p>
    </div>
    <div className="border-r pr-2 w-screen max-w-[70px]">
      <small className="font-bold">Preço</small>
      <div>R$ {Number(it.quantidade * Number(it.preco)).toFixed(2)}</div>
    </div>
    <button className=" text-red-600 max-w-[70px]" onClick={()=>diminuir(index)}>remover</button>
    </div>
  ) )}
</div>

<div className="border-t flex flex-col text-white">
<button className="text-center animate-pulse py-4 font-bold border text-red-600" onClick={abrirCart}>Adicionar mais itens</button>
<div className="flex px-2 py-2 justify-between text-gray-500 font-bold"><p>subtotal</p><p>R$ {Number(total).toFixed(2)}</p></div>
 <div className="flex justify-between items-center py-4  font-bold p-2 bg-slate-500 border-t">
 <div className="flex gap-4">
 <p>Total</p>
 <p>R$ {(Number(total) + 3 ).toFixed(2)}</p>
 </div>
 <button className="py-2 px-6 bg-green-600 text-white rounded-md" onClick={()=>setOpenCheckout(true)}>Finalizar</button>
 </div>
</div>

</div>
</div>}

      {inf.modal && (
        <div className="fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center bg-opacity-30 z-30 p-4" id="modalItems" onClick={closeModal}>
          <div className="max-w-lg mx-auto w-screen bg-white rounded-md flex overflow-hidden relative">
          <button className="absolute bg-white rounded-br-lg px-4 flex items-center gap-2 py-2 right-0" onClick={()=>inf.setOpenModal(false)}><IoIosArrowBack /> voltar</button>
            <img src={inf.itemcart.urlImage} alt={`imagem do ${inf.itemcart.produto}`} className="max-w-[80px] w-screen max-h-[80px] lg:max-w-[140px] lg:max-h-[140px] absolute right-0 rounded-tl-md bottom-0  order-4" />
            <div className="p-3 flex flex-col gap-2">
              <h1 className="font-bold text-gray-500">{inf.itemcart.produto}</h1>
              <p className="leading-4 text-gray-500">{inf.itemcart.descricao}</p>
              <p className="text-green-600 font-semibold text-xl">R$ {Number(inf.itemcart.preco).toFixed(2)}</p>
              <div>
                <div className="flex flex-wrap flex-col items-start gap-2 md:gap-4">
                  <div className="border px-6 py-1 flex items-center rounded-md justify-between gap-2">
                    <span className="text-2xl cursor-pointer text-red-600">-</span>
                    <span className="font-bold">{contador}</span>
                    <span className="text-2xl text-red-600 cursor-pointer" onClick={aumentar}>+</span>
                  </div>
                  <button className="bg-red-600 py-2 px-6 rounded-md text-white" onClick={() => addnoCarrinho(inf.itemcart, contador)}>Adicionar R${Number(contador * Number(inf.itemcart.preco).toFixed(2)).toFixed(2)}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-screen max-w-xl mx-auto lg:max-w-7xl p-2 overflow-x-scroll lg:overflow-x-auto mt-[310px] py-4 flex lg:items-center lg:justify-center gap-4" id="tudo">
        <button className="border rounded-md cat px-4 py-1 text-gray-600 font-bold  ativo" id="sanduiches" onClick={addAndRemoveAtivo}>Sanduiches</button>
        <button className="border rounded-md cat px-4 py-1 text-gray-600 font-bold " id="omeletes" onClick={addAndRemoveAtivo}>Omeletes</button>
        <button className="border rounded-md cat px-4 py-1 text-gray-600 font-bold " id="porcoes" onClick={addAndRemoveAtivo}>Porcões</button>
        <button className="border rounded-md cat px-4 py-1 text-gray-600 font-bold " id="macarrao" onClick={addAndRemoveAtivo}>Macarrão na chapa</button>
        <button className="border rounded-md cat px-4 py-1 text-gray-600 font-bold " id="bebidas" onClick={addAndRemoveAtivo}>Bebidas</button>
        <button className="border rounded-md cat px-4 py-1 text-gray-600 font-bold " id="bomboniere" onClick={addAndRemoveAtivo}>Bomboniere</button>
      </div>

      <div className=' max-w-7xl grid-cols-1 grid md:grid-cols-2 mx-auto p-4 gap-8 items-center justify-center mt-[20px] mb-[100px]'>
        {dados.map((item) => (
          <div className=' border rounded-md shadow-sm overflow-hidden flex hover:border-gray-300 transition-all bg-white' key={item.id} onClick={() => inf.verItem(item)}>
            <img src={item.urlImage} alt="" className='max-w-[70px] md:max-w-[90px] lg:max-w-[120px] object-cover' />
            <div className="flex flex-col gap-2 flex-1">
              <div className='p-2 flex flex-col gap-2'>
                <h1 className='text-semibold text-gray-500 font-bold text-xl'>{item.produto}</h1>
                <p className='text-gray-500 leading-4'>{item.descricao}</p>
                <p className='text-green-600 font-bold text-xl'>R$ {item.preco}</p>
              </div>
            </div>
          </div>
        ))}
      </div>



      {checkout && <div className="inset-0 fixed bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-screen max-w-md bg-white p-4 rounded-md text-gray-600">
          <h1 className="text-gray-600 text-xl text-center font-semibold border-b py-2">Preencha os dados corretamente</h1>
          <div className="flex items-center justify-center m-2">{error && <p className="text-red-600 font-bold">{error}</p> }</div>
          <div className="flex flex-col mt-2 text-gray-600">
          <label htmlFor="nome" className=" font-semibold">Digite seu nome</label>
          <input type="text" id="nome" value={nome} onChange={({target})=>setNome(target.value)} className="border rounded-md py-2 bg-gray-100 pl-2"/>
          </div>

          <div className="mt-2">
      <h2 className="text-gray-600 font-semibold">Selecione uma opção de entrega:</h2>
      <div className="flex gap-4">
      <label>
        <input
          type="radio"
          value="buscar"
          checked={opcaoSelecionada === 'buscar'}
          onChange={() => handleSelecionarOpcao('buscar')}
        />
        Buscar
      </label>
      <label>
        <input
          type="radio"
          value="delivery"
          checked={opcaoSelecionada === 'delivery'}
          onChange={() => handleSelecionarOpcao('delivery')}
        />
        Delivery
      </label>
      </div>
    </div>

          {opcaoSelecionada ==="delivery" && <div>
          <div className="flex flex-col mt-2">
          <label htmlFor="rua" className=" font-semibold">Nome da rua</label>
          <input type="text" id="rua" value={rua} onChange={({target})=>setRua(target.value)} className="border rounded-md py-2 bg-gray-100"/>
          </div>

          <div className="flex flex-col mt-2">
          <label htmlFor="numero" className=" font-semibold">Número da casa</label>
          <input type="text" id="numero" value={numero} onChange={({target})=>setNumero(target.value)} className="border rounded-md py-2 bg-gray-100"/>
          </div>

          <div className="flex flex-col mt-2">
          <label htmlFor="bairro" className=" font-semibold">Bairro:</label>
          <input type="text" id="bairro" value={bairro} onChange={({target})=>setBairro(target.value)} className="border rounded-md py-2 bg-gray-100"/>
          </div>

          <div className="flex flex-col mt-2">
          <label htmlFor="complemento" className=" font-semibold">Complemento (opcional):</label>
          <input type="text" id="complemento" value={complemento} onChange={({target})=>setComplemento(target.value)} className="border rounded-md py-2 bg-gray-100 pl-2" placeholder="exemplo : perto da farmácia"/>
          </div>

          <div className="flex flex-col mt-2">
                <label htmlFor="pagamento" className="font-semibold">Selecione forma de pagamento</label>
                <select value={pagamento} id="pagamento" onChange={({target})=>setPagamento(target.value)}>
                <option value="" disabled>Selecione</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Pix">Pix</option>
                  <option value="Cartão">Cartão</option>
                </select>
              </div>
              {pagamento==="Dinheiro" && 
              <div className="mt-2 flex flex-col">
              <label htmlFor="troco" className="font-semibold">Precisa de troco?</label>
                <input type="text" className="border bg-gray-50 py-2 rounded-md" placeholder="exemplo : troco pra 50, tenho trocado" value={troco} onChange={({target})=>setTroco(target.value)}/>
              </div>
              }
          </div>
          
          }

          <div className="flex items-center justify-center mt-4 gap-4">
          <button className="bg-green-600 py-2 px-6 rounded-md text-center text-white" onClick={finalizarCompra}>Finalizar Compra</button>
          <button className="py-2 px-6 rounded-md border " onClick={()=>setOpenCheckout(false)}>Voltar</button>
          </div>
             </div>
           </div>}

           {fechado && <div className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-screen max-w-sm rounded-md p-4">
              <h1 className="text-gray-500 text-center text-xl py-2 font-bold border-b">Olá, no momento estamos fechados 😢</h1>
              <p className="leading-4 py-2 text-gray-600 text-center">Nosso horário de funcionamento é de terça à Domingo das 18:00 as 00:00 </p>
            </div>
           </div>}

    </div>
  )
}

export default page;

