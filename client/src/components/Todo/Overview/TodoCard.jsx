import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { ViewfinderCircleIcon } from '@heroicons/react/24/solid'
import DialogForm from 'components/Dialog/DialogForm'
import { Tooltip } from 'components/Layouts'
import { AnimatePresence, motion } from 'framer-motion'
import useTodo from 'hooks/useTodo'
import queryString from 'query-string'
import { memo, useCallback, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import FlagButton from '../FlagButton'

const TodoCard = ({ colType, data, variant }) => {
  const history = useHistory()
  const location = useLocation()

  const isOpenDetail = useMemo(
    () => queryString.parse(location.search)?.todoId === data._id,
    [data._id, location.search]
  )

  const [loading, setLoading] = useState({
    flag: false
  })

  const { updateFlag } = useTodo()

  const toggleLoading = useCallback((field) => {
    setLoading((prev) => ({ ...prev, [field]: !prev[field] }))
  }, [])

  const haddleUpdateFlag = useCallback(() => {
    const onProcess = () => {
      toggleLoading('flag')
    }
    const onSuccess = () => {
      toggleLoading('flag')
    }
    const onError = (err) => {
      console.error(err)
      toggleLoading('flag')
    }

    updateFlag(colType, data._id, onProcess, onSuccess, onError)
  }, [colType, data._id, toggleLoading, updateFlag])

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        className={`mt-5 flex 
        rounded-5 border border-gray-500 bg-gray-700 font-bevn
        text-gray-200`}
        initial='initial'
        animate='enter'
        exit='exit'
        variants={variant}
        layoutId={`todo-layout-item-${data._id}`}
      >
        <div
          className='card-drag-handle flex w-[15px] cursor-pointer 
        items-center justify-center bg-gray-500'
        >
          <EllipsisVerticalIcon className='text-gray-50' />
        </div>
        <div className='w-[calc(100%-15px)] p-5'>
          {data?.cover ? (
            <div className='mb-2 h-auto max-h-[300px] w-full'>
              <img src='' alt='' className='w-full object-cover' />
            </div>
          ) : null}

          <div className='flex w-full justify-between'>
            <h5
              className='w-[calc(100%-1.5rem-10px)] text-justify text-base 
              font-normal leading-[20px] text-white line-clamp-3'
            >
              {data.title}
            </h5>
            <div className='w-6 cursor-pointer'>
              <Tooltip component={<p className='text-xs'>View</p>}>
                <ViewfinderCircleIcon
                  className={`w-6 transition duration-200 hover:text-white`}
                  onClick={() => {
                    history.replace(`/todos?todoId=${data._id}`)
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <div
            className='mt-2 mb-[30px] text-justify text-sm
          font-light leading-[15px] line-clamp-3'
          >
            {data.description}
          </div>
          <div
            className='flex w-full items-center justify-between 
            gap-1'
          >
            <FlagButton
              isFlag={data.pin}
              onClick={haddleUpdateFlag}
              loading={loading.flag}
            />
            <span className='font-primary text-xs italic'>
              updated 22 min ago
            </span>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        <DialogForm
          isDialogOpen={isOpenDetail}
          onClose={() => history.replace('/todos')}
        >
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <motion.div
              className={`mt-5 flex min-w-[400px] rounded-5 border border-gray-500
            bg-gray-700 font-bevn text-gray-200`}
              variants={variant}
              layoutId={`todo-layout-item-${data._id}`}
            >
              <div className='w-[calc(100%-15px)] p-5'>
                {data?.cover ? (
                  <div className='mb-2 h-auto max-h-[300px] w-full'>
                    <img src='' alt='' className='w-full object-cover' />
                  </div>
                ) : null}

                <div className='flex w-full justify-between'>
                  <h5
                    className='w-[calc(100%-1.5rem-10px)] text-justify text-base 
                font-normal leading-[20px] text-white line-clamp-3'
                  >
                    {data.title}
                  </h5>
                  <div className='w-6 cursor-pointer'>
                    <Tooltip component={<p className='text-xs'>View</p>}>
                      <ViewfinderCircleIcon
                        className={`w-6 transition duration-200 hover:text-white`}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div
                  className='mt-2 mb-[30px] text-justify text-sm
                font-light leading-[15px] line-clamp-3'
                >
                  {data.description}
                </div>
                <div
                  className='flex w-full items-center justify-between 
                gap-1'
                >
                  <FlagButton
                    isFlag={data.pin}
                    onClick={haddleUpdateFlag}
                    loading={loading.flag}
                  />
                  <span className='font-primary text-xs italic'>
                    updated 22 min ago
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </DialogForm>
      </AnimatePresence>
    </AnimatePresence>
  )
}

export default memo(TodoCard)
