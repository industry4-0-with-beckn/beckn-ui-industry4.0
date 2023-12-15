import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component'
import { useLanguage } from '../../hooks/useLanguage'
import useRequest from '../../hooks/useRequest'
import Router from 'next/router'
import { responseDataActions } from '../../store/responseData-slice'
import Loader from '../../components/loader/Loader'

import { RetailItem } from '../../lib/types/products'

interface Props {
  product: RetailItem
  // onSelectData: (val: any) => void
}
const DetailsSection: React.FC<Props> = ({ product }) => {
  const { t } = useLanguage()
  const [url, setUrl] = useState()
  const [showComponent, setShowComponent] = useState(false)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { data, loading, error, fetchData } = useRequest()
  const dispatch = useDispatch()

  const id = product.id
  const providerItemid = product.items[0].id
  // "66b7b9bad166-4a3f-ada6-ca063dc9d321"
  const providerFulfillmentid = 'f1'
  const bppId = product.context.bppId
  const bppUri = product.context.bppUri //"https://35f2-194-95-60-104.ngrok-free.app"
  const providerTagname = 'select-1'

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
    if (data) {
      // dispatch(responseDataActions.addTransactionId(data.context.transaction_id))

      const selectedUrl = data.formUrl
      const providerId = data.selectProvider.provider.id
      const itemId = data.selectProvider.items[0].id
      const fulfillment = data.selectProvider.fulfillments[0].id
      // onSelectData({ url: selectedUrl, providerId: providerId, itemId: itemId, fulfillmentId = fulfillment})

      // let providers = data.selectProviders.provider() =>{
      // return {
      //     providers: {
      //       id: provider.id,
      //     },
      //     descriptor: {
      //       name: provider.name,
      //       long_desc: provider.long_desc,
      //       images: provider.image,
      //     },
      //     formUrl: items.xinput.form.url
      //   }
      // }

      localStorage.setItem('selectUrl', JSON.stringify(selectedUrl))
      Router.push(
        `/formDetails?url=${selectedUrl}&pId=${providerId}&iId=${itemId}&fId=${fulfillment}&bppId=${bppId}&bppUri=${bppUri}`
      )
      localStorage.setItem('selectUrl', JSON.stringify(selectedUrl))
    }
    // })
  }, [data])

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
          onClick={fetchDataForSelect}

          // onChange={urlNew}
        >
          Book now
        </Button>
      </div>
    </Box>
  )
}

export default DetailsSection
