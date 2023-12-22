import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { useLanguage } from '../hooks/useLanguage'
import useRequest from '../hooks/useRequest'
import { getInitMetaDataPerBpp, getPayloadForConfirmRequest } from '../utilities/confirm-utils'
import Loader from '../components/loader/Loader'
import { TransactionIdRootState } from '../lib/types/cart'
import Button from '../components/button/Button'
import ConfirmOrder from '../components/confirmOrder/ConfirmOrder'
import { selectConfirmItem } from '../store/confirm-slice'

const OrderConfirmation = () => {
  const { t } = useLanguage()
  const router = useRouter()
  const { data, loading, error, fetchData } = useRequest()

  // const { data, loading, error, fetchData } = useRequest()
  const transactionId = useSelector((state: { transactionId: TransactionIdRootState }) => state.transactionId)
  const confirmItem = useSelector(selectConfirmItem)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const trackPayload = {
    context: {
      bppId: confirmItem?.context.bppId,
      bppUri: confirmItem?.context.bppUri
    },
    orderId: confirmItem?.order.id
  }
  // const orderDetailHandler = (): void =>{
  const orderDetailHandler = () => {
    // fetchData(`${apiUrl}/track`, 'POST', trackPayload)

    // if (data) {
    //   const url = data.trackUrl
    router.push(`/orderDetails?`)
    //     localStorage.setItem('trackurl', JSON.stringify(url))
    //   }
  }
  const homeHandler = (): void => {
    router.push('/homePage?')
  }
  if (loading) {
    return <Loader />
  }

  return (
    <Box>
      <ConfirmOrder
        confirmationText={
          <>
            <Text fontSize={'17px'} fontWeight={'600'} textAlign={'center'}>
              {t.orderPlaced}
            </Text>
            <Stack>
              <Text textAlign={'center'} marginTop={'8px'} marginBottom={'40px'} fontSize={'15px'} fontWeight="400">
                {t.confirmMessage1} <br />
              </Text>
            </Stack>
          </>
        }
      />
      <VStack>
        <Button
          buttonText={t.viewOrderDetails}
          background={'rgba(var(--color-primary))'}
          color={'rgba(var(--text-color))'}
          isDisabled={false}
          handleOnClick={() => {
            orderDetailHandler()
          }}
        />
        <Button
          buttonText={t.backToHome}
          background={'transparent'}
          color={'rgba(var(--color-primary))'}
          isDisabled={false}
          handleOnClick={homeHandler}
        />
      </VStack>
    </Box>
  )
}

export default OrderConfirmation
