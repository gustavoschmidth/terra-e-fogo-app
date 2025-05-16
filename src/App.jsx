import { useState } from "react";

const categorizedMenu = {
  Lanches: [
    { id: 1, name: "Smash Burguer", price: 29.99, image: "/images/smash.jpg" },
    { id: 2, name: "Explosão Suína", price: 34.99, image: "/images/suina.jpg" },
    { id: 3, name: "Saladão Brutal", price: 19.99, image: "/images/saladao.jpg" },
  ],
  Combos: [
    { id: 4, name: "Combo 1 (Smash, Batata P, Refri 350ml)", price: 42.99, image: "/images/combo1.jpg" },
    { id: 5, name: "Combo 2 (Explosão Suína, Batata P, Refri 350ml)", price: 47.00, image: "/images/combo2.jpg" },
    { id: 6, name: "Combo 3 (Saladão Brutal, Batata P, Refri 350ml)", price: 32.00, image: "/images/combo3.jpg" },
  ],
  Porções: [
    { id: 7, name: "Batata Frita P", price: 10.00, image: "/images/batata_p.jpg" },
    { id: 8, name: "Batata Frita G", price: 20.00, image: "/images/batata_g.jpg" },
    { id: 9, name: "Batata Frita G c/ Cheddar e Bacon", price: 34.99, image: "/images/batata_cheddar.jpg" },
  ],
  Bebidas: [
    { id: 10, name: "Coca-Cola Lata 350ml", price: 5.00, image: "/images/coca.jpg" },
    { id: 11, name: "Guaraná Antarctica Lata 350ml", price: 5.00, image: "/images/guarana.jpg" },
    { id: 12, name: "Fanta Laranja Lata 350ml", price: 5.00, image: "/images/fanta_laranja.jpg" },
    { id: 13, name: "Fanta Uva Lata 350ml", price: 5.00, image: "/images/fanta_uva.jpg" },
  ],
  Adicionais: [
    { id: 14, name: "Adicional: Cheddar", price: 5.00, image: "/images/cheddar.jpg" },
    { id: 15, name: "Adicional: Cebola caramelizada", price: 5.00, image: "/images/cebola.jpg" },
    { id: 16, name: "Adicional: Bacon", price: 5.00, image: "/images/bacon.jpg" },
    { id: 17, name: "Adicional: Hambúrguer", price: 9.00, image: "/images/hamburguer.jpg" },
    { id: 18, name: "Adicional: Cebola", price: 2.00, image: "/images/cebola_simples.jpg" },
    { id: 19, name: "Adicional: Mayo", price: 3.00, image: "/images/mayo.jpg" },
  ],
};

export default function HamburgueriaApp() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };
  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const sendToWhatsApp = () => {
    const phone = "5511976350752";
    const itemList = cart.map((item) => `- ${item.name} (R$${item.price.toFixed(2)})`).join("%0A");
    const message = `Olá, gostaria de fazer um pedido:%0A${itemList}%0A%0ATotal: R$${getTotal().toFixed(2)}%0A%0ANome: ${name}%0AEndereço: ${address}%0AObservações: ${notes}`;
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-[#1a1a1a] text-white font-sans rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-orange-500 text-center">Cardápio Terra & Fogo</h1>

      {Object.entries(categorizedMenu).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b border-orange-500 pb-1">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-[#2c2c2c] rounded-lg p-4">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
                <div className="font-semibold text-lg text-orange-400">{item.name}</div>
                <div className="text-sm text-gray-300 mb-2">R${item.price.toFixed(2)}</div>
                <button onClick={() => addToCart(item)} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">Adicionar</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2 className="text-2xl font-bold mb-2 text-orange-500">Carrinho</h2>
      <ul className="mb-4">
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between border-b border-gray-600 py-2">
            {item.name} - R${item.price.toFixed(2)}
            <button onClick={() => removeFromCart(index)} className="text-red-400 text-sm">Remover</button>
          </li>
        ))}
      </ul>
      <p className="mb-4 font-semibold">Total: R${getTotal().toFixed(2)}</p>

      <input className="mb-2 w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="mb-2 w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600" placeholder="Endereço para entrega" value={address} onChange={(e) => setAddress(e.target.value)} />
      <textarea className="mb-4 w-full p-2 rounded bg-[#2c2c2c] text-white border border-gray-600" placeholder="Observações" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button onClick={sendToWhatsApp} disabled={!name || !address || cart.length === 0} className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded">
        Enviar pedido via WhatsApp
      </button>
    </div>
  );
}