import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MockupGenerator.css';
import { 
  PackageSearch, 
  ChevronDown, 
  Palette, 
  Upload 
} from 'lucide-react';
import icone from './assets/icone.png';
import caneca from './assets/caneca.png';
import camisapreta from './assets/camisa.jpg';
import camisaazul from './assets/camisaazul.jpg';
import canecaazul from './assets/caneca-termica-azul.jpg';
import canecapreta from './assets/caneca-termica-preta.jpg';
import canecavermelha from './assets/caneca-termica-vermelha.jpg';

import SelectCustom from './SelectCustom';

const MockupGenerator = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const products = [
    { id: 0, name: 'Caneca de Porcelana', icon: caneca, options: [{img: caneca, color: 'bg-white'}] },
    { id: 1, name: 'Camisa', icon: camisapreta, options: [ {img: camisapreta, color: 'bg-black'}, {img: camisaazul, color: 'bg-blue-500'}] },
    { id: 2, name: 'Copo Térmico', icon: canecapreta, options: [ {img: canecapreta, color: 'bg-black'}, {img: canecaazul, color: 'bg-blue-500'},  {img: canecavermelha, color: 'bg-red-500'}] },
  ];

  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  // ESTADOS DE POSIÇÃO E ESCALA
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [artScale, setArtScale] = useState(1);

  const productFromUrl = products.find(p => p.id === Number(id)) || products[0];
  const [selectedProduct, setSelectedProduct] = useState(productFromUrl);
  const [selectedColor, setSelectedColor] = useState(productFromUrl.options[0].img);

  const [isProductOpen, setIsProductOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(false);

  useEffect(() => {
    const product = products.find(p => p.id === Number(id));
    if (product) {
      setSelectedProduct(product);
      setSelectedColor(product.options[0].img);
      setPosition({ x: 0, y: 0 });
      setArtScale(1);
    }
  }, [id]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleProductChange = (newProduct) => {
    setSelectedProduct(newProduct);
    setSelectedColor(newProduct.options[0].img);
    navigate(`/${newProduct.id}`);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans text-slate-800 select-none">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src={icone} className="logo w-8 h-8" alt="logo" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Fortaleza Brindes</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-8">
        <section 
          className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-12 flex items-center justify-center min-h-[550px] shadow-sm relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="w-full h-full bg-[#043659] rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-500 ease-in-out">
            
            <img 
              src={selectedColor}
              alt="Base do Produto" 
              className="absolute inset-0 w-full h-full object-contain p-1 z-0 pointer-events-none" 
            />

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  onMouseDown={handleMouseDown}
                  style={{ 
                    transform: `translate(${position.x}px, ${position.y}px) scale(${artScale})`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  className="w-44 h-44 object-contain opacity-90 mix-blend-multiply transition-transform duration-75 ease-out"
                  alt="Sua Arte" 
                />
              ) : (
                <div onClick={() => fileInputRef.current.click()} className="flex flex-col items-center justify-center bg-black/5 hover:bg-black/10 p-12 rounded-full cursor-pointer border border-white/10 transition-all">
                  <Upload size={56} className="text-white opacity-30" />
                  <span className="text-[10px] font-black uppercase text-white opacity-30 mt-4">Carregar Arte</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div onClick={() => setIsProductOpen(!isProductOpen)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-3 text-slate-700 font-bold"><PackageSearch size={20} /><span>Produto</span></div>
              <ChevronDown size={20} className={`transition-transform ${isProductOpen ? 'rotate-180' : ''}`} />
            </div>
            {isProductOpen && (
              <div className="p-4 border-t border-gray-100">
                <SelectCustom selected={selectedProduct} setSelected={handleProductChange} products={products} />
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div onClick={() => setIsColorOpen(!isColorOpen)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-3 text-slate-700 font-bold"><Palette size={20} /><span>Cor</span></div>
              <ChevronDown size={20} className={`transition-transform ${isColorOpen ? 'rotate-180' : ''}`} />
            </div>
            {isColorOpen && (
              <div className="p-4 flex gap-3 overflow-x-auto border-t border-gray-100">
                {selectedProduct.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(option.img)} 
                    className={`w-8 h-8 rounded-full ${option.color} ring-2 ring-offset-2 ${selectedColor === option.img ? 'ring-blue-500' : 'ring-transparent'} transition-all`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 text-sm">Tamanho da Arte</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {Math.round(artScale * 100)}%
              </span>
            </div>
            
            <div className="relative pt-2">
              <input
                type="range" min="0.5" max="1.5" step="0.1"
                value={artScale}
                onChange={(e) => setArtScale(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#043659] relative z-10"
              />
              <div className="flex justify-between w-full px-1 mt-2">
                {[0.5, 0.7, 0.9, 1.0, 1.1, 1.3, 1.5].map((val) => (
                  <div key={val} className="flex flex-col items-center gap-1">
                    <div className={`w-0.5 transition-all ${artScale === val ? 'h-3 bg-blue-500' : 'h-1.5 bg-gray-300'}`} />
                    {val === 1.0 && <span className="text-[8px] text-gray-400 font-bold">100%</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default MockupGenerator;