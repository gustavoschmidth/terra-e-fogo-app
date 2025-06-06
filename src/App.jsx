import { useState, useEffect } from "react";

const categorizedMenu = {
  "Lanches": [
    { id: 3, name: "Saladão Brutal", price: 19.99, image: "/images/saladao.jpg", description: "Pão brioche, burger 120gr, queijo, alface americano, cebola roxa, mayo" },
    { id: 22, name: "X Clássico Burguer", price: 19.0, image: "/images/x_classico.jpg", description: "Pão brioche, burger 120gr, queijo prato, mayo" },
    { id: 21, name: "Mega Cheddar Melt", price: 25.0, image: "/images/mega_chedder.jpg", description: "Pão brioche, burger 120gr, queijo cheddar, molho cheddar" },
    { id: 2, name: "Explosão Suína", price: 34.99, image: "/images/suina.jpg", description: "Pão brioche, burger 120gr, bacon crocante, queijo cheddar, cebola caramelizada, mayo" },
    { id: 20, name: "Smash Turbo", price: 38.0, image: "/images/smash_turbo.jpg", description: "Pão brioche, 2 burger 120gr turbo, queijo cheddar, cebola caramelizada, picles, mayo" },
    { id: 23, name: "Burguer Terra & Fogo", price: 39.0, image: "/images/terra_fogo.jpg", description: "Pão brioche, burger 120gr, queijo cheddar, bacon, onion rings, molho barbecue" }
  ],
  "Combos": [
    { id: 4, name: "Combo Smash Burger (Smash, Batata P, Refri 350ml)", price: 42.00, image: "/images/combo1.jpg", description: "Lanche smash burguer, batata individual pequena, refrigerante lata 350ml" },
    { id: 5, name: "Combo Explosão Suína (Explosão Suína, Batata P, Refri 350ml)", price: 47.00, image: "/images/combo2.jpg", description: "Lanche explosão suína, batata individual pequena, refrigerante lata 350ml" },
    { id: 6, name: "Combo Saladão Brutal (Saladão Brutal, Batata P, Refri 350ml)", price: 32.00, image: "/images/combo3.jpg", description: "Lanche saladão brutal, batata individual pequena, refrigerante lata 350ml" },
    { id: 7, name: "Combo Mega Cheddar Melt", price: 38.00, image: "/images/combo_mega_chedder.jpg", description: "Mega Cheddar Melt, batata individual pequena, refrigerante lata 350ml" },
    { id: 8, name: "Combo Smash Turbo Duplo", price: 52.00, image: "/images/combo_smash_turbo.jpg", description: "Smash Turbo Duplo, batata individual pequena, refrigerante lata 350ml" },
    { id: 9, name: "Combo X- Clássico Burguer", price: 32.00, image: "/images/combo_x_classico.jpg", description: "X Clássico Burguer, batata individual pequena, refrigerante lata 350ml" },
    { id: 10, name: "Combo Terra & Fogo", price: 51.00, image: "/images/combo_terra_fogo.jpg", description: "Burguer Terra & Fogo, batata individual pequena, refrigerante lata 350ml" }
  ],
  "Porções": [
    { id: 7, name: "Batata Frita P", price: 10.00, image: "/images/batata_p.jpg", description: "Porção individual pequena de batata frita" },
    { id: 8, name: "Batata Frita G", price: 20.00, image: "/images/batata_g.jpg", description: "Porção grande de batata frita para compartilhar" },
    { id: 9, name: "Batata Frita G c/ Cheddar e Bacon", price: 34.99, image: "/images/batata_cheddar.jpg", description: "Batata grande com cobertura de cheddar cremoso e bacon crocante" }
  ],
  "Bebidas": [
    { id: 10, name: "Coca-Cola Lata 350ml", price: 5.00, image: "/images/coca.jpg" },
    { id: 14, name: "Coca-Cola Zero Lata 350ml", price: 5.00, image: "/images/coca_zero.jpg" },
    { id: 12, name: "Fanta Laranja Lata 350ml", price: 5.00, image: "/images/fanta_laranja.jpg" },
    { id: 13, name: "Fanta Uva Lata 350ml", price: 5.00, image: "/images/fanta_uva.jpg" },
    { id: 11, name: "Guaraná Antarctica Lata 350ml", price: 5.00, image: "/images/guarana.jpg" },
    { id: 15, name: "Pepsi Lata 350ml", price: 5.00, image: "/images/pepsi.jpg" }
  ],
  "Adicionais": [
    { id: 14, name: "Adicional: Cheddar", price: 5.00, image: "/images/cheddar.jpg" },
    { id: 15, name: "Adicional: Cebola caramelizada", price: 5.00, image: "/images/cebola.jpg" },
    { id: 16, name: "Adicional: Bacon", price: 5.00, image: "/images/bacon.jpg" },
    { id: 17, name: "Adicional: Hambúrguer", price: 9.00, image: "/images/hamburguer.jpg" },
    { id: 18, name: "Adicional: Cebola", price: 2.00, image: "/images/cebola_simples.jpg" },
    { id: 19, name: "Adicional: Mayo", price: 3.00, image: "/images/mayo.jpg" },
    { id: 20, name: "Adicional: Onion Rings", price: 7.00, image: "/images/onion_rings.jpg" }
  ]
};

export default function HamburgueriaApp() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [payment, setPayment] = useState("");
  const [change, setChange] = useState("");
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showPixKey, setShowPixKey] = useState(false);
  const [pixReceipt, setPixReceipt] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const pixKey = "terraefogoburguer@gmail.com";

  useEffect(() => {
    setShowPixKey(payment === "Pix");
  }, [payment]);

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    alert("Chave PIX copiada para a área de transferência!");
  };

  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPixReceipt(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, envie um comprovante válido em formato de imagem.");
    }
  };

  const sendToWhatsApp = () => {
    if (payment === "Pix" && !pixReceipt) {
      alert("Por favor, anexe o comprovante do pagamento via PIX antes de continuar.");
      return;
    }
    const phone = "5511976350752";
    const itemList = cart.map((item) => `- ${item.name} x${item.quantity || 1} (R$${(item.price * (item.quantity || 1)).toFixed(2)})`).join("%0A");
    const message = `Olá, gostaria de fazer um pedido:%0A${itemList}%0A%0ATotal: R$${getTotal().toFixed(2)}%0A%0ANome: ${name}%0AEndereço: ${address}%0AObservações: ${notes}%0AForma de pagamento: ${payment}${payment === 'Dinheiro' && change ? `%0ATroco para: R$${change}` : ''}${payment === 'Pix' && pixReceipt ? `%0AComprovante PIX: Enviado como imagem.` : ''}`;
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    const qty = item.quantity || 1;
    if (exists) {
      const updatedCart = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: (i.quantity || 1) + qty } : i
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: qty }]);
    }
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, text: `${item.name} x${qty} foi adicionado ao carrinho!` }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 2500);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const clearCart = () => {
    setShowConfirmClear(true);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <><div className="p-6 max-w-2xl mx-auto bg-[#1a1a1a] text-white font-sans rounded-xl shadow-lg">
      <div className="flex justify-center mb-6">
        <img src="/images/Terra.jpg" alt="Logo Terra & Fogo" className="h-28 sm:h-32 md:h-36 w-auto rounded-full border-4 border-orange-500 shadow-lg object-cover transition-transform duration-300 hover:scale-105" />
      </div>

      <div className="mb-6 p-4 bg-[#2c2c2c] border-l-4 border-orange-500 text-white rounded text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-orange-400 mb-2">🍔 Sobre Nós</h2>
        <p>
          Na <strong>Terra & Fogo Burger</strong> 🔥, acreditamos que um bom hambúrguer vai além do sabor — ele conta uma história.
          Unimos ingredientes de qualidade, receitas autorais e muito carinho ❤️ em cada preparo para oferecer uma experiência única a cada mordida.
        </p>
        <p className="mt-2">
          Somos uma hamburgueria 100% focada em <strong>delivery</strong> 🛵. Tudo é feito na hora, com atenção aos detalhes e aquele toque especial que só quem ama o que faz consegue entregar.
        </p>
        <p className="mt-2">
          Aqui é o lugar certo pra matar sua fome com estilo 😋. Escolha seu lanche favorito, faça seu pedido e deixe o resto com a gente!
        </p>
      </div>

      <div className="mb-6 p-4 bg-[#2c2c2c] border-l-4 border-orange-500 text-orange-300 rounded">
        <strong>📍 Entrega grátis até 3km</strong><br />
        Para distâncias maiores, a taxa será informada após consulta.
      </div>

      <div className="flex justify-center mb-6">
        <video
          src="/videos/promo.mp4"
          className="rounded-lg border-4 border-orange-500 shadow-lg max-h-72 w-full object-cover"
          autoPlay
          loop
          muted
          playsInline />
      </div>

      <h1 className="text-2xl font-extrabold mb-6 text-orange-500 text-center border-b-4 border-orange-400 inline-block pb-2 shadow-orange-500 drop-shadow-md">
        🍽️ Nosso Cardápio
      </h1>

      <div className="fixed top-4 right-4 z-50 space-y-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-green-600 text-white px-4 py-2 rounded shadow-md animate-bounce">
            {alert.text}
          </div>
        ))}
      </div>

      {Object.entries(categorizedMenu).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b border-orange-500 pb-1">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-[#2c2c2c] rounded-lg p-4 border-2 border-orange-500">
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => setSelectedImage(item.image)}
                  className="w-full h-48 object-contain bg-black rounded-xl mb-2 transition-transform duration-300 ease-in-out hover:scale-105 border-2 border-white cursor-pointer"
                  loading="lazy" />
                <div className="font-semibold text-lg text-orange-400">{item.name}</div>
                <div className="text-sm text-gray-300 mb-2">R${item.price.toFixed(2)}</div>
                {item.description && (
                  <div className="text-xs mt-1 bg-[#1f1f1f] text-orange-300 border border-orange-500 px-3 py-2 rounded shadow-sm">
                    {item.description}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center border border-gray-600 rounded overflow-hidden">
                    <button onClick={() => { item._qty = Math.max((item._qty || 1) - 1, 1); setAlerts([...alerts]); }} className="px-3 bg-gray-700 text-white">-</button>
                    <span className="px-4 text-white">{item._qty || 1}</span>
                    <button onClick={() => { item._qty = (item._qty || 1) + 1; setAlerts([...alerts]); }} className="px-3 bg-gray-700 text-white">+</button>
                  </div>
                  <button onClick={() => addToCart({ ...item, quantity: item._qty || 1 })} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">Adicionar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold z-50"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-screen rounded-lg border-4 border-white shadow-2xl" />
          </div>
        </div>
      )}

      {/* CARRINHO E FORMULÁRIO */}
      <h2 className="text-2xl font-bold mb-2 text-orange-500">Carrinho</h2>
      <ul className="mb-4">
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between border-b border-gray-600 py-2">
            {item.name} x{item.quantity || 1} - R${(item.price * (item.quantity || 1)).toFixed(2)}
            <button onClick={() => removeFromCart(index)} className="text-red-400 text-sm">Remover</button>
          </li>
        ))}
      </ul>
      <p className="mb-4 font-semibold">Total: R${getTotal().toFixed(2)}</p>

      <button onClick={clearCart} className="mb-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">Limpar carrinho</button>

      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2c2c2c] p-6 rounded-lg shadow-xl text-white w-80">
            <h3 className="text-lg font-semibold mb-4">Remover todos os itens?</h3>
            <p className="mb-6">Tem certeza que deseja limpar o carrinho?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowConfirmClear(false)} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded">Cancelar</button>
              <button onClick={() => { setCart([]); setShowConfirmClear(false); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      <input className="mb-2 w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="mb-2 w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600" placeholder="Endereço para entrega" value={address} onChange={(e) => setAddress(e.target.value)} />
      <textarea className="mb-2 w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600" placeholder="Observações" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <select className="mb-2 w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600" value={payment} onChange={(e) => setPayment(e.target.value)}>
        <option value="">Selecione a forma de pagamento</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Pix">PIX</option>
        <option value="Cartão">Cartão (Débito/Crédito)</option>
      </select>

      {payment === "Dinheiro" && (
        <input className="mb-4 w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600" placeholder="Troco para quanto?" value={change} onChange={(e) => setChange(e.target.value)} />
      )}

      {showPixKey && (
        <div className="mb-4 p-4 bg-[#2c2c2c] border border-orange-500 rounded-lg text-center">
          <p className="mb-2 text-orange-400">Chave PIX:</p>
          <div className="mb-2 text-white select-all">{pixKey}</div>
          <button onClick={copyPixKey} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-2">Copiar chave PIX</button>
          <input type="file" accept="image/*" onChange={handleReceiptChange} className="w-full text-sm text-gray-300 file:bg-orange-500 file:border-none file:px-3 file:py-1 file:rounded file:text-white" />
          {pixReceipt && (<div className="mt-2 text-sm text-green-400">Comprovante anexado com sucesso!</div>)}
        </div>
      )}

      <button onClick={sendToWhatsApp} disabled={!name || !address || cart.length === 0} className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded">Enviar pedido via WhatsApp</button>
    </div><footer className="mt-10 text-center text-gray-400 text-sm">
        Projeto idealizado e desenvolvido por Gustavo Schmidth – © 2025.
      </footer></>
  );
}
