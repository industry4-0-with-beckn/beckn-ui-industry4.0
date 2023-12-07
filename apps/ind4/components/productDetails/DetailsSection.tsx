import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { useLanguage } from '../../hooks/useLanguage'
import useRequest from '../../hooks/useRequest'
import Router from 'next/router'

import { RetailItem } from '../../lib/types/products'

interface Props {
  product: RetailItem
}
const DetailsSection: React.FC<Props> = ({ product }) => {
  const { t } = useLanguage()
  const [showComponent, setShowComponent] = useState(false)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { data, loading, error, fetchData } = useRequest()
  const [showContentA, setShowContentA] = useState(true)

  const id = product.id
  const providerItemid = product.items[0].id
  // "66b7b9bad166-4a3f-ada6-ca063dc9d321"
  const providerFulfillmentid = JSON.stringify(product.items[0].fulfillment_id)
  const providerTagname = 'select-1'
  const bppId = 'beckn-sandbox-bpp.becknprotocol.io'
  // const bppId = "beckn-sandbox-bpp.becknprotocol.io"
  const bppUri = 'https://sandbox-bpp-network.becknprotocol.io/'
  // console.log("dank item",itemId)

  // const handleBook = () => {
  // localStorage.setItem('proDet', JSON.stringify({ id: id}))

  // Router.push(`/orderDetails?id=${id}`)

  const selectPayload = {
    context: {
      bppId: bppId,
      bppUri: bppUri
    },
    providerId: id,
    itemId: providerItemid,
    fulfillmentId: providerFulfillmentid,
    tagName: providerTagname
  }

  const fetchDataForSelect = () => fetchData(`${apiUrl}/select`, 'POST', selectPayload)

  useEffect(() => {
    // console.log(data)
    // const formUrl = 'http://localhost:8080'

    if (data) {
      dispatch(responseDataActions.addTransactionId(data.context.transaction_id))
      let selectedItem = data.selectProviders.map((provider: any) => {
        return {
          order: {
            provider: {
              id: provider.id
            },
            descriptor: {
              name: provider.name,
              long_desc: provider.long_desc,
              images: provider.image
            },
            formUrl: items[0].xinput.form.url
          }
        }
      })
      localStorage.setItem('selectItems', JSON.stringify(selectedItem))
      setItems(selectedItem)
    }
    // window.addEventListener('beforeunload', fetchDataForSelect)
    // return () => {
    //   // Cleanup the event listener when the component is unmounted
    //   window.removeEventListener('beforeunload', fetchDataForSelect)
    // }
    // if(data){
    //   const formUrl = 'http://localhost:8080'
    //   Router.push(`/orderDetails?url=${formUrl}`)
    // }
  }, [data])
  const toggleContent = () => {
    setShowContentA(!showContentA)
  }
  const urlNew = () => {
    fetchDataForSelect()

    const formUrl = 'http://localhost:8080'
    Router.push(`/orderDetails?url=${formUrl}`)
  }

  const ContentA = () => (
    <div>
      <h2>This is Content A</h2>
      <p>Some content for A...</p>
    </div>
  )

  const ContentB = () => (
    <div>
      <h2>This is Content B</h2>
      <p>Some content for B...</p>
    </div>
  )

  //----
  useEffect(() => {
    localStorage.removeItem('optionTags')
    localStorage.setItem('optionTags', JSON.stringify({ name: product.descriptor.name }))
    window.dispatchEvent(new Event('storage-optiontags'))
  }, [product])

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
          {product.descriptor.name}
        </h2>
        <Text mt={'10px'} mb={'10px'} fontSize={'14px'}>
          {product.descriptor.short_desc}
        </Text>
      </Flex>
      <hr className="mt-1 hidden md:block" />
      <div className="flex items-start flex-wrap relative ">
        <div className="flex-grow ">
          <div className="flex items-center self-center" style={{ justifyContent: 'center' }}>
            <StarRatingComponent name="product_rate" starCount={5} value={parseFloat(product.rating)} />
            <p className="text-sm text-palette-mute rtl:mr-2 ltr:ml-2 pl-1 ">
              {parseFloat(product.rating)} {t.stars}
            </p>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: product.descriptor.long_desc
            }}
            className="mt-4 product_description_text border-2 border_radius_all"
            style={{
              padding: '0px 10px',
              maxHeight: '400px',
              overflow: 'auto'
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col">
        <Button
          background={'rgba(var(--color-primary))'}
          color={'rgba(var(--text-color))'}
          isDisabled={false}
          onClick={urlNew}

          // onChange={urlNew}
        >
          Book now
        </Button>
      </div>
    </Box>
  )
}

export default DetailsSection
