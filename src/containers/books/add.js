import React from 'react'
import Form from './components/form'
import { Layout} from 'antd'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const { Content } = Layout

const Books = () => (
    <Layout className="layout">
        <Content>
            <h1 className="header text-xl font-bold">Add New Book</h1>
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
                <Form />
                {/* end: form */}
            </div>
        </Content>
    </Layout>
)

export default Books
