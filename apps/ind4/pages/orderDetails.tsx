import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { RetailItem } from '../lib/types/products'
import React, { useEffect, useState } from 'react'

import { RetailItem } from '../lib/types/products'
import Loader from '../components/loader/Loader'

interface Props {
  product: RetailItem
}
const OrderDet: React.FC<Props> = ({ product }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const router = useRouter()
  const [items, setItems] = useState([])
  const [showComponent, setShowComponent] = useState(false)
  const [formUrl, setformUrl] = useState(router.query?.url || '')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const openUrl = window.open(formUrl)
      //  window.location.href = formUrl'
      return () => {}
    }
  }, [])

  // const [id, setId] = useState(router.query?.id || '')
  //   const { data, loading, error, fetchData } = useRequest()

  //   const selectPayload = {
  //     providerId: id
  //   }

  // const fetchDataForSelect = () => fetchData(`${apiUrl}/select`, 'POST', selectPayload)
  // useEffect(() => {
  //   console.log(data)

  //   if (data) {
  //     dispatch(responseDataActions.addTransactionId(data.context.transaction_id))
  //     let selectedItem = data.selectProviders.map((provider: any) => {
  //       return {
  //         order: {
  //           provider: {
  //             id: provider.id
  //           },
  //           descriptor: {
  //             name: provider.name,
  //             long_desc: provider.long_desc,
  //             images: provider.image
  //           },
  //           formUrl: items[0].xinput.form.url
  //         }
  //       }
  //     })
  //     localStorage.setItem('selectItems', JSON.stringify(selectedItem))
  //     setItems(selectedItem)
  //   }
  // }, [data])

  useEffect(() => {
    setShowComponent(true)
  }, [])

  if (!showComponent) {
    return <></>
  }

  return (
    <Box
      padding={'15px 5px'}
      className="bg-[#fff] md:bg-transparent  md:w-auto  flex-grow self-center lg:self-start md:mt-0  lg:ltr:ml-4 lg:rtl:mr-4 md:py-0 rounded-tl-xl rounded-tr-xl flex flex-col z-10"
    >
      <Flex justifyContent={'center'} alignItems={'center'} flexDirection="column">
        <h2
          className="text-palette-mute whitespace-normal border_radius_all"
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#000',
            textAlign: 'center'
          }}
        >
          {/* {product.provider.name} */}
        </h2>
        <Text mt={'10px'} mb={'10px'} fontSize={'14px'}>
          {/* {product.descriptor.short_desc} */}
        </Text>
      </Flex>
      <hr className="mt-1 hidden md:block" />
      <div className="flex items-start flex-wrap relative ">
        <div className="flex-grow "></div>
      </div>
      {/* <div className="flex flex-col">
        <Button
          background={'rgba(var(--color-primary))'}
          color={'rgba(var(--text-color))'}
          isDisabled={false}
        //   onClick={fetchDataForSelect}
        >
        </Button>
      </div> */}
    </Box>
  )
}

export default OrderDet
