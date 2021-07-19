import React, { useCallback } from 'react'
import moment from 'moment'
import { Layout} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../../modules/book'

const { Content } = Layout

const Books = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { items } = useSelector(state => state.book)

    const _remove = useCallback((e, index) => {
        e.preventDefault()

        if (confirm('Are you sure you want to remove this item?')) {
            dispatch(remove(index))
        }
    }, [])

    const _edit = useCallback((e, item) => {
        e.preventDefault()
        history.push(`/books/edit/${item.id}`)
    }, [])

    return (
        <Layout className="layout">
            <Content>
                <h1 className="header text-xl font-bold">Books</h1>
                <div className="container">
                    {/* start: nav */}
                    <div className="flex flex-row border-b border-gray-300 pb-4 mb-4">
                        <div className="flex-1">
                            <span className="flex-1 text-lg font-bold underline">
                                Book List
                            </span>
                        </div>
                        <div>
                            <Link to="/books/add">
                                <button 
                                    type="button"
                                    className="flex flex-row items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                >
                                    <span className="mr-2">Add New Book</span>
                                    <FaPlusCircle size={18} />
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* end: nav */}

                    {/* start: list */}
                    <div className="overflow-x-auto">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th style={{
                                        width: '40px',
                                        textAlign: 'center',
                                    }}>#</th>
                                    <th className="py-3 px-6 text-left">Title</th>
                                    <th className="py-3 px-6 text-left">Author</th>
                                    <th className="py-3 px-6 text-center">Cover</th>
                                    <th className="py-3 px-6 text-left">Finished</th>
                                    <th className="py-3 px-6 text-center">Duration (Days)</th>
                                    <th className="py-3 px-6 text-center">Options</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {items.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {item.title}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {item.author}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {item.cover &&
                                            <img src={item.cover} className="rounded-md" style={{
                                                maxHeight: 80,
                                                margin: '0 auto',
                                            }} />}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {moment(item.finished).format('DD/MMM/YY')}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {item.duration}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <a href="#" className="mx-2 text-blue-600" onClick={e => _edit(e, item)}>
                                                Edit Book
                                            </a>
                                            <a href="#" className="mx-2 text-red-600" onClick={e => _remove(e, index)}>
                                                Remove
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {items.length < 1 &&
                                <tr className="border-b border-gray-200">
                                    <td className="py-3 px-6 text-center" colSpan={7}>
                                        - Book list is empty -
                                    </td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                    {/* end: list */}
                </div>
            </Content>
        </Layout>
    )
}

export default Books
