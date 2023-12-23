import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { RetailItem } from '../lib/types/products'
import React, { useEffect, useState } from 'react'
import useRequest from '../hooks/useRequest'
import { useLanguage } from '../hooks/useLanguage'
import Loader from '../components/loader/Loader'
interface Props {
  product: RetailItem
}
const FormDetails: React.FC<Props> = ({ product }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { t } = useLanguage()

  const router = useRouter()
  const [items, setItems] = useState([])
  const { data, loading, error, fetchData } = useRequest()
  const [showComponent, setShowComponent] = useState(false)
  const [formUrl, setformUrl] = useState(router.query?.url || '')
  const [itemId, setItemId] = useState(router.query?.iId || '')
  const [providerId, setProviderId] = useState(router.query?.pId || '')
  const [fulfillmentId, setFulfillmentId] = useState(router.query?.fId || '')
  const [bppId, setbppId] = useState(router.query?.bppId || '')
  const [bppUri, setbppUri] = useState(router.query?.bppUri || '')
  const [selectData, setselectData] = useState(null)

  useEffect(() => {
    setShowComponent(true)
  }, [])

  const providerTagname = 'select-2'

  const select2Payload = {
    context: {
      bppId: bppId,
      bppUri: bppUri
    },
    providerId: providerId,
    itemId: itemId,
    fulfillmentId: fulfillmentId,
    tagName: providerTagname
  }

  const fetchDataForSelect2 = () => fetchData(`${apiUrl}/select`, 'POST', select2Payload)

  const handleShipping = () => {
    if (data) {
      router.push(`/shippingDetails?iId=${itemId}&pId=${providerId}&fId=${fulfillmentId}&bId=${bppId}&bUri=${bppUri}`)
    }
  }

  if (!showComponent) {
    return <></>
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexDirection="column">
      <div style={{ width: '100%', height: '95%', float: 'center' }}>
        {formUrl ? (
          <iframe title="Embedded Content" src={formUrl} width="100%" height="450" />
        ) : (
          <p>No URL selected.</p>
        )}
      </div>

      <div className="flex flex-col mt-4 mx-auto my-auto">
        <Button
          background={'rgba(var(--color-primary))'}
          color={'rgba(var(--text-color))'}
          isDisabled={false}
          width={'250%'}
          alignSelf={'center'}
          onClick={fetchDataForSelect2}
        >
          Submit form
        </Button>
      </div>

      <div className="flex flex-col mt-4 mx-auto my-auto">
        <Button
          background={'rgba(var(--color-primary))'}
          color={'rgba(var(--text-color))'}
          isDisabled={false}
          width={'170%'}
          alignSelf={'center'}
          onClick={handleShipping}
        >
          Add Shipping Details
        </Button>
      </div>
    </Flex>
  )
}

export default FormDetails
