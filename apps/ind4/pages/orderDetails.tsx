import { Box, CardBody, Divider, Flex, Text, Image, Card, useDisclosure, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Accordion from '../components/accordion/Accordion'
import { useLanguage } from '../hooks/useLanguage'
import TrackIcon from '../public/images/TrackIcon.svg'
import ViewMoreOrderModal from '../components/orderDetails/ViewMoreOrderModal'
import { useSelector } from 'react-redux'
import { TransactionIdRootState } from '../lib/types/cart'
import useRequest from '../hooks/useRequest'
import { useRouter } from 'next/router'
import DetailsCard from '../components/detailsCard/DetailsCard'
import Button from '../components/button/Button'
import Link from 'next/link'
import ConfirmOrder from '../components/confirmOrder/ConfirmOrder'
import { selectConfirmItem } from '../store/confirm-slice'

const OrderDetails = () => {
  const [allOrderDelivered, setAllOrderDelivered] = useState(false)
  const confirmItem = useSelector(selectConfirmItem)
  const [statusResponse, setStatusResponse] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const transactionId = useSelector((state: { transactionId: TransactionIdRootState }) => state.transactionId)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const statusRequest = useRequest()
  const trackRequest = useRequest()
  const router = useRouter()
  const [status, setStatus] = useState('progress')
  const { data, loading, error, fetchData } = useRequest()
  const [update, setUpdate] = useState('')
  const [orderedAt, setOrderedAt] = useState('')
  const [trackurl, setTrackUrl] = useState('')
  const { t } = useLanguage()
  const requestsCount = 5
  let requestsSent = 0
  const bppId = confirmItem?.context.bppId
  const bppUri = confirmItem?.context.bppUri
  const orderId = confirmItem?.order.id
  const pname = confirmItem?.order?.provider?.descriptor?.name
  const pdesc = confirmItem?.order?.provider?.descriptor?.short_desc
  const fulfillment = confirmItem?.order?.fulfillments[0].state?.descriptor
  const [prevStatus, setPrevStatus] = useState(null)
  const [updatedStatus, setUpdatedStatus] = useState(null)

  const statusPayload = {
    context: {
      bppId: bppId,
      bppUri: bppUri
    },
    orderId: orderId
  }

  useEffect(() => {
    const fetchDataForStatus = () => {
      try {
        fetchData(`${apiUrl}/status`, 'POST', statusPayload)
        if (data) {
          const newUpdate = data.statusProv.order.fulfillments[0].state.descriptor.short_desc
          setUpdate(newUpdate)

          if (newUpdate === 'Completed') {
            setAllOrderDelivered(true)
          }
        }
        const newStatus = update
        if (newStatus !== prevStatus) {
          setUpdatedStatus(newStatus)
          setPrevStatus(newStatus)
        }
      } catch (error) {
        // Handle error, e.g., log or display an error message
        console.error('Error fetching data:', error)
      }
    }

    const intervalId = setInterval(() => {
      if (requestsSent < requestsCount) {
        fetchDataForStatus()
        setStatusResponse([...statusResponse, update])
        requestsSent++
      } else {
        clearInterval(intervalId)
      }
    }, 6000)

    return () => {
      clearInterval(intervalId)
    }
  }, [statusResponse, update, requestsSent, requestsCount, prevStatus])

  // console.log(statusResponse)

  useEffect(() => {
    // Your existing useEffect logic here
    const prev = 'Completed'
    // Assuming statusResponse is a state variable
    statusResponse.forEach((status, index) => {
      if (status === 'In Progress' || status === 'Completed') {
        if (status !== prev) {
          // Do something with the updated status, e.g., set it in the state
          // setStatusResponse(updatedStatus);
        }
        setUpdatedStatus(status)
      }
    })
  }, [statusResponse, prevStatus])

  const handleTrack = () => {
    fetchData(`${apiUrl}/track`, 'POST', statusPayload)
    if (data) {
      const url = data.trackUrl
      window.open(url)
    } else {
      const url = 'https://2f62-194-95-60-104.ngrok-free.app/track'
      window.open(url)
    }
  }

  return (
    <Box className="hideScroll" maxH={'calc(100vh - 100px)'} overflowY="scroll">
      {allOrderDelivered ? (
        <Card mb={'20px'} border={'1px solid rgba(94, 196, 1, 1)'} className="border_radius_all">
          <CardBody padding={'15px 20px'}>
            <Flex alignItems={'center'} pb={'3px'}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image width={'12px'} height={'13px'} src={TrackIcon} />
              <Text pl={'8px'} fontSize={'17px'} fontWeight={'600'}>
                Order Completed!
              </Text>
            </Flex>
            <Flex alignItems={'center'} fontSize={'15px'} pl={'20px'}>
              <Text onClick={() => router.push('/homePage')} pl={'10px'} color={'rgba(var(--color-primary))'}>
                Browse more services ?
              </Text>
            </Flex>
          </CardBody>
        </Card>
      ) : null}

      <DetailsCard>
        <Box fontWeight={600} fontSize={'17px'} pr={'8px'} pb="10px">
          {t.orderSummary}
        </Box>
        <Flex pt={'unset'} justifyContent={'space-between'} alignItems={'center'}>
          <Text>{pname}</Text>
        </Flex>

        <Box>
          <Flex pt={4} justifyContent={'space-between'} alignItems={'center'}>
            <Text>{t.orderId}</Text>
            <Text>{'4662'}</Text>
          </Flex>
        </Box>
      </DetailsCard>
      <Accordion
        accordionHeader={
          <Box>
            <Flex mb={'15px'} fontSize={'17px'} alignItems={'center'}>
              <Text fontWeight={600} fontSize={'17px'} pr={'8px'}>
                {t.orderId}
              </Text>

              <Text textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={'nowrap'}>
                {'4662'}
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Flex maxWidth={'57vw'}>
                <Text
                  textOverflow={'ellipsis'}
                  overflow={'hidden'}
                  whiteSpace={'nowrap'}
                  fontSize={'12px'}
                  fontWeight={'400'}
                >
                  {pname}
                </Text>
              </Flex>

              {updatedStatus === 'Completed' ? (
                <Text fontSize={'12px'} fontWeight="600" color={'#5EC401'}>
                  Completed
                </Text>
              ) : (
                <Text fontSize={'12px'} fontWeight="600" color={'#FDC025'}>
                  In Progress
                </Text>
              )}
            </Flex>
          </Box>
        }
      >
        <ViewMoreOrderModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} items={fulfillment} orderId={orderId} />
        <Divider mb={'20px'} />
        <CardBody pt={'unset'} fontSize={'15px'}>
          <Box>
            <Flex alignItems={'center'}>
              <Image src="/images/done.svg" alt="" />
              <Text pl={'8px'} fontSize="15px" fontWeight={'600'} onClick={handleTrack}>
                Click here to Track
              </Text>
            </Flex>
            <Text pl="28px" fontSize={'12px'}>
              22st Dec 2023, 12:11pm
            </Text>
          </Box>

          {/* <div>
            {status === 'In Progress' ? (
              <Box
                key={index}
                fontSize={'15px'}
                color={'rgba(var(--color-primary))'}
                pt="10px"
                pl="28px"
                onClick={handleTrack}
              >
                {t.viewCourse}
              </Box>
            ) : null}
          </div> */}
        </CardBody>
      </Accordion>
    </Box>
  )
}

export default OrderDetails
