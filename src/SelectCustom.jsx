import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

export default function SelectCustom({ inicialProduct, selected, setSelected, products }) {
  // Define qual produto mostrar como padrão caso 'selected' seja nulo
  const currentProduct = selected || inicialProduct;

  return (
    <Listbox value={currentProduct} onChange={setSelected}>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 border border-gray-200">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            {/* CORREÇÃO: src agora aponta para currentProduct.icon */}
            <img 
              alt={currentProduct?.name} 
              src={currentProduct?.icon} 
              className="size-6 shrink-0 rounded bg-gray-50 object-contain" 
            />
            <span className="block truncate font-medium">
              {currentProduct?.name}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {products.map((product) => (
            <ListboxOption
              key={product.id}
              value={product}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#043659] data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                {/* CORREÇÃO: Exibe a imagem (icon) de cada produto na lista */}
                <img 
                  alt={product.name} 
                  src={product.icon} 
                  className="size-8 shrink-0 rounded bg-gray-50 object-contain border border-gray-100" 
                />
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {product.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#043659] group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}