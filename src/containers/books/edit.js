import React, { useEffect, useState } from 'react'
import Form from './components/form'
import { Layout} from 'antd'
import { Link, useParams, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const { Content } = Layout

const Books = () => {
    const history = useHistory()
    const { id } = useParams()
    const { items } = useSelector(state => state.book)
    const [book, setBook] = useState()

    useEffect(() => {
        const item = items.find(e => e.id == id)

        if (!item) {
            history.push('/books')
        }
        setBook(item)
    }, [])

    if (!book) {
        return <></>
    }

    return (
        <Layout className="layout">
            <Content>
                <h1 className="header text-xl font-bold">Edit Book</h1>
                <div className="container">
                    {/* start: nav */}
                    <div className="flex flex-row border-b border-gray-300 pb-4 mb-4">
                        <div className="flex-1">
                            <Link to="/books">
                                <button 
                                    type="button"
                                    className="flex flex-row items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                >
                                    <FaArrowLeft size={18} />
                                    <span className="ml-2">Back</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* end: nav */}
                    
                    {/* start: form */}
                    <Form item={book} />
                    {/* end: form */}
                </div>
            </Content>
        </Layout>
    )
}

export default Books
