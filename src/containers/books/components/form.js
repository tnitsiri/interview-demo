import React from 'react'
import CogoToast from 'cogo-toast'
import classNames from 'classnames'
import moment from 'moment'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Oval } from 'react-loading-icons'
import { v1 as uuidv1 } from 'uuid'
import { useDispatch } from 'react-redux'
import { update, add } from '../../../modules/book'
import { useHistory } from 'react-router-dom'

const now = moment()
const allowedFileType = 'image/png,image/x-png,image/jpg,image/jpeg'

export default function Component({ item }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [doing, setDoing] = useState(false)
    const [done, setDone] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: item ? item.title : '',
            author: item ? item.author : '',
            cover: null,
            finished: item ? moment(item.finished).format('YYYY-MM-DD') : '',
            duration: item ? item.duration : '',
        },
    })

    const _save = useCallback(async (payload) => {
        if (doing || done) {
            return
        }

        setDoing(true)

        // update
        if (item) {
            try {
                let cover = item.cover || null
                
                if (payload.cover && payload.cover.length == 1) {
                    cover = await _convertFileToBase64(payload.cover[0])
                }

                dispatch(update({
                    id: item.id,
                    title: payload.title,
                    author: payload.author,
                    cover,
                    finished: moment(payload.finished).toDate(),
                    duration: payload.duration,
                }))

                setDone()
                CogoToast.success('Updated book successfully.')
                history.push('/books')
            }
            catch (e) {
                console.error(e)
                setDoing(false)
                CogoToast.error('An error occurred during operation.')
            }
        }
        // add
        else {
            try {
                const id = uuidv1()
                let cover = null
                
                if (payload.cover && payload.cover.length == 1) {
                    cover = await _convertFileToBase64(payload.cover[0])
                }

                dispatch(add({
                    id,
                    title: payload.title,
                    author: payload.author,
                    cover,
                    finished: moment(payload.finished).toDate(),
                    duration: payload.duration,
                }))

                setDone()
                CogoToast.success('Add new book successfully.')
                history.push('/books')
            }
            catch (e) {
                console.error(e)
                setDoing(false)
                CogoToast.error('An error occurred during operation.')
            }
        }
    }, [])

    const _convertFileToBase64 = useCallback(async (file) => {
        return await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
                resolve(reader.result)
            }

            reader.onerror = (e) => {
                reject(e)
            }
        })
    }, [])

    const _coverChanged = useCallback(e => {
        if (doing) {
            return
        }

        if (e.target.files && e.target.files.length == 1) {
            const file = e.target.files[0]
            const allowedFileTypes = allowedFileType.split(',')

            if (allowedFileTypes.indexOf(file.type.toLowerCase()) < 0) {
                CogoToast.error('Allowed image file only.')
                e.target.value = ''
            }
        }
    }, [
        allowedFileType,
        doing,
    ])
    
    return (
        <div className="relative mb-2">
            <form onSubmit={handleSubmit(_save)} className="form flex flex-col items-start">
                <div className="w-full lg:w-1/2 xl:w-1/3">
                    <div className="relative w-full mb-4">
                        <div className="mb-1">
                            <span>Book Title</span>
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="w-full">
                            <input
                                {...register('title', {
                                    required: true,
                                    maxLength: 300,
                                    validate: v => !!v.trim(),
                                })}
                                type="text"
                                placeholder=""
                                maxLength={300}
                                className={classNames({
                                    'w-full rounded-md': true,
                                    'border-red-500': errors.title,
                                })}
                                autoFocus={true}
                            />
                            {errors.title && <div className="text-red-500 mt-1">Please specify book title.</div>}
                        </div>
                    </div>
                    <div className="relative w-full mb-4">
                        <div className="mb-1">
                            <span>Book Author</span>
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="w-full">
                            <input
                                {...register('author', {
                                    required: true,
                                    maxLength: 150,
                                    validate: v => !!v.trim(),
                                })}
                                type="text"
                                placeholder=""
                                maxLength={150}
                                className={classNames({
                                    'w-full rounded-md': true,
                                    'border-red-500': errors.author,
                                })}
                            />
                            {errors.author && <div className="text-red-500 mt-1">Please specify book author.</div>}
                        </div>
                    </div>
                    <div className="relative w-full mb-4">
                        <div className="mb-1">
                            <span>Book Cover</span>
                            {!item &&
                            <span className="text-red-500">*</span>}
                        </div>
                        <div className="w-full">
                            <input
                                {...register('cover', {
                                    required: !item,
                                })}
                                type="file"
                                placeholder=""
                                className={classNames({
                                    'w-full': true,
                                    'border-red-500': errors.cover,
                                })}
                                accept={allowedFileType}
                                onChange={_coverChanged}
                            />
                            {errors.cover && <div className="text-red-500 mt-1">Please select book cover.</div>}
                        </div>
                    </div>
                    <div className="relative w-full mb-4">
                        <div className="mb-1">
                            <span>Finished Reading Date</span>
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="w-full">
                            <input
                                {...register('finished', {
                                    required: true,
                                    validate: v => !!v.trim(),
                                })}
                                type="date"
                                placeholder=""
                                className={classNames({
                                    'w-full rounded-md': true,
                                    'border-red-500': errors.finished,
                                })}
                                min={now.format('YYYY-MM-DD')}
                            />
                            {errors.finished && <div className="text-red-500 mt-1">Please specify book finished reading date.</div>}
                        </div>
                    </div>
                    <div className="relative w-full mb-4">
                        <div className="mb-1">
                            <span>Reading Duration (Days)</span>
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="w-full">
                            <input
                                {...register('duration', {
                                    required: true,
                                    validate: v => !!v.trim() && parseInt(v.trim()) > 0,
                                })}
                                type="number"
                                placeholder=""
                                className={classNames({
                                    'w-full rounded-md': true,
                                    'border-red-500': errors.duration,
                                })}
                                min={0}
                            />
                            {errors.duration && <div className="text-red-500 mt-1">Please specify reading duration.</div>}
                        </div>
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="flex flex-row items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded-md"
                    disabled={doing || done}
                >
                    <span>Save</span>
                    {doing && <span className="ml-2"><Oval stroke="#fff" width={15} height={15} /></span>}
                </button>
            </form>
        </div>
    )
}