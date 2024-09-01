import Menu from '../components/Menu';
import { useEffect, useState, useCallback } from "react";
import API from "../utils/api";
import Modal from "../components/Modal";

function Receber() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [contaReceber, setContaReceber] = useState([])
    const [selectedConta, setSelectedConta] = useState(null);
    const [tot, setTot] = useState([])

    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    const nextItems = async () => {
        try {
            const response = await fetch(`${nextPage}`);
            const data = await response.json();
            setContaReceber(data.results);
            setNextPage(data.next)
            setPreviousPage(data.previous)
            console.log(data.next)
            console.log(data.previous)
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        }
    };
    
    const previousItems = async () => {
        try {
            const response = await fetch(`${previousPage}`);
            const data = await response.json();
            setContaReceber(data.results);
            setNextPage(data.next)
            setPreviousPage(data.previous)
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        }
    };

    const handleContaChange = (contId) => {
        const contaAreceber = contaReceber.find(p => p.venda.IdVenda === contId);
        setSelectedConta(contaAreceber);
        console.log(contaAreceber);
    };

    const getContaReceber = useCallback(async () => {
        try {
            const { data } = await API.get('/contas-receber/')

            if (data && data.results) {
                setTot(data.count)
                setContaReceber(data.results)
                setNextPage(data.next)
                setPreviousPage(data.previous)
            }
        } catch (error) {
            console.error(console.error('Erro ao buscar as conta a receber:', error))
        }
    }, [])

    useEffect(() => {
        getContaReceber()
    }, [getContaReceber])

    return (
        <div>
            <Menu />

            <div className="sticky top-14 right-0 w-full p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-white dark:border-white">
                <div className="w-full mb-1">
                    <div className="mb-5">
                        <h1 className="text-2xl font-semibold text-neutral-950 sm:text-2xl dark:text-black">Contas a Receber</h1>
                    </div>
                    <div className="sm:flex">
                        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-100">
                            <form className="lg:pr-3" action="#" method="GET">
                                <label htmlFor="contaReceber-search" className="sr-only">Search</label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <input type="text" name="pesquisar" id="contaReceber-search" className="bg-gray-50 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Pesquisar"></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-cyan-800">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"></input>
                                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-white">ID</th>
                                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-white">Nome</th>
                                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-white">Data da venda</th>
                                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-white">Forma de pagamento</th>
                                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-white">qtd parcelas</th>
                                        <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-white">Ação</th>
                                    </tr>
                                </thead>
                                {contaReceber.length > 0 ? (
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-white dark:divide-gray-700">
                                        {contaReceber.map((cont) => (
                                            <tr key={cont.venda.IdVenda} className="hover:bg-gray-100 dark:hover:bg-gray-200">
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id={`checkbox-${cont.venda.IdVenda}`}
                                                            aria-describedby="checkbox-1"
                                                            type="checkbox"
                                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor={`checkbox-${cont.venda.IdVenda}`} className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-black">{cont.venda.IdVenda}</td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-black">{cont.venda.IdCliente.NomePessoa}</td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-black">{cont.venda.DataVenda}</td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-black">{cont.venda.FormaPagamento}</td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-black">{cont.venda.Parcelas}</td>
                                                <td className="p-4 space-x-2 whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        onClick={() => { handleContaChange(cont.venda.IdVenda); openModal(); }}
                                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-cyan-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                        Visualizar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>) : (
                                    <tr>
                                        <td colSpan="8" className="p-4 text-center">Nenhuma conta a receber encontrado</td>
                                    </tr>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="st bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-cyan-800 dark:border-gray-700">
                <div className="flex items-center mb-4 sm:mb-0">
                    <span className="text-sm font-normal text-gray-500 dark:text-white">Total de Contas <span className="font-semibold text-gray-900 dark:text-white">{tot}</span></span>
                </div>
                <div className="flex items-center space-x-3">
                    <button onClick={previousItems} disabled={previousPage === null} className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Anterior
                    </button >
                    <button onClick={nextItems} disabled={nextPage === null} className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Próxima
                        <svg className="w-5 h-5 ml-1 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </button >
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => closeModal()}>
                <div className="flex items-start justify-between p-5 border-b rounded-t dark:bg-cyan-800 dark:border-gray-700">
                    <h3 className="text-xl font-semibold dark:text-white">
                        Valores a receber
                    </h3>
                </div>
                <div>
                    {selectedConta ? (
                        <div className="m-5">
                            <div className="overflow-x-auto max-h-80">
                                <table className="min-w-full bg-white divide-y divide-gray-200 dark:bg-white dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="p-4 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-black">Valor</th>
                                            <th className="p-4 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-black">Data de vencimento</th>
                                            <th className="p-4 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-black">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-white dark:divide-gray-700">
                                        {selectedConta.parcelas.map((parcela, idx) => (
                                            <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-200">
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-black">{parcela.Valor} $</td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-black">{parcela.DataVencimento}</td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-black">{parcela.Status ? 'Pago' : 'Pendente'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-white divide-y divide-gray-200 dark:bg-white dark:divide-gray-700">
                                <div className="flex justify-end p-4">
                                    <span className="font-medium text-gray-700">Sub-Total:</span>
                                    <span className="pl-2 text-gray-500">{(selectedConta.venda.TotalVenda).toFixed(2)}$</span>
                                </div>
                                <div className="flex justify-end p-4 font-bold text-gray-700">
                                    <span>Total:</span>
                                    <span className="pl-2 text-gray-500">{(selectedConta.venda.TotalVenda).toFixed(2)}$</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Erro ao carregar os dados.</p>
                        </div>
                    )}
                </div>
                <div className="items-center p-5 border-t  border-gray-200 rounded-b dark:border-gray-700 dark:bg-cyan-800">
                    <button className="text-white bg-primary-700 border border-white hover:border-transparent hover:bg-white hover:text-black focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Salvar Alteração</button>
                </div>
            </Modal>

        </div>
    )
}

export default Receber;