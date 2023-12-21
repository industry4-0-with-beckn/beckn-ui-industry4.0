import React, { useState } from 'react'
import { Box, Flex, Text, Image, Card, CardBody } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/button/Button'
import CardWithCheckBox from '../components/card/Card'
import useRequest from '../hooks/useRequest'
import { useLanguage } from '../hooks/useLanguage'
import creditCardImg from '../public/images/creditCardImg.svg'
import { cartAction } from '../store/cart-slice'
import { selectInitItem } from '../store/init-slice'

function PaymentMode() {
  const [checked, setChecked] = useState(false)
  const { data, loading, error, fetchData } = useRequest()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const { t } = useLanguage()
  const router = useRouter()
  const dispatch = useDispatch()
  const initItem = useSelector(selectInitItem)
  const confirmPayload = {
    context: {
      bppId: initItem?.context.bppId,
      bppUri: initItem?.context.bppUri
    },
    providerId: initItem.provider.id,
    itemId: initItem.items[0].id,

    fulfillmentId: initItem.fulfillments[0].id,
    customerEmail: initItem.fulfillments[0].customer.contact.email,
    customerPhone: initItem.fulfillments[0].customer.contact.phone,
    customerName: initItem.fulfillments[0].customer.person.name,
    stopType: initItem.fulfillments[0]?.stops?.type,

    gps: initItem.fulfillments[0]?.stops[0]?.location?.gps,
    address: initItem.fulfillments[0]?.stops[0]?.location?.address,
    stopPhone: initItem.fulfillments[0]?.stops[0]?.contact?.phone,
    billName: initItem.billing.name,
    billAddress: initItem.billing.address,
    billEmail: initItem.billing.email,
    billPhone: initItem.billing.phone,

    collected_by: initItem.payments[0].collected_by,

    amount: initItem.payments[0].params.amount,
    currency: initItem.payments[0].params.currency,
    bank_account_number: initItem.payments[0].params.bank_account_number,
    bank_code: 'INB0004321',
    bank_account_name: initItem.payments[0].params.bank_account_name,
    status: 'PAID',
    type: initItem.payments[0].type
  }
  const fetchDataForConfirm = () => fetchData(`${apiUrl}/confirm`, 'POST', confirmPayload)
  if (data) {
    // const provider = data.confirmProv.provider
    // const items = data.confirmProv.items
    // const fulfillments = data.confirmProv.fulfillments
    // const billing = data.confirmProv.billing
    // const payments = data.confirmProv.payments
    // const breakup = data.confirmProv.quote.breakup
    // const allDetails: initItem = {
    //   context: {
    //     bppId: bppId,
    //     bppUri: bppUri
    //   },
    //   provider: {
    //     id: provider.id,
    //     descriptor: {
    //       name: provider.descriptor.name,
    //       short_desc: provider.descriptor.short_desc,
    //       long_desc: provider.descriptor.long_desc
    //       // image: provider.descriptor.images.map((image: any) => image?.url),
    //     }
    //   },
    //   items: [
    //     {
    //       id: items[0].id,
    //       descriptor: {
    //         name: items[0].descriptor.name
    //       },
    //       category_ids: [items[0].category_ids],
    //       price: {
    //         currency: items[0].price.currency,
    //         value: items[0].price.value
    //       }
    //     }
    //   ],
    //   fulfillments: [
    //     {
    //       id: fulfillments[0].id,
    //       customer: {
    //         contact: {
    //           email: fulfillments[0].customer.contact.email,
    //           phone: fulfillments[0].customer.contact.mobileNumber
    //         },
    //         person: {
    //           name: fulfillments[0].customer.person.name
    //         }
    //       },
    //       stops: [
    //         {
    //           type: fulfillments[0]?.stops?.type,
    //           location: {
    //             gps: fulfillments[0]?.stops?.location?.gps,
    //             address: fulfillments[0]?.stops?.location?.address
    //           },
    //           contact: {
    //             phone: fulfillments[0]?.stops[0]?.contact?.phone
    //           }
    //         }
    //       ],
    //       tracking: fulfillments[0].tracking
    //     }
    //   ],
    //   billing: {
    //     name: billing.name,
    //     address: billing.address,
    //     state: {
    //       name: billing.state.name
    //     },
    //     city: {
    //       name: billing.city.name
    //     },
    //     email: billing.email,
    //     phone: billing.phone
    //   },
    //   payments: [
    //     {
    //       collected_by: payments[0].collected_by,
    //       params: {
    //         amount: payments[0].params.amount,
    //         currency: payments[0].params.currency,
    //         bank_account_number: payments[0].params.bank_account_number,
    //         bank_code: payments[0].params.bank_code,
    //         bank_account_name: payments[0].params.bank_account_name
    //       },
    //       status: payments[0].status,
    //       type: payments[0].type
    //     }
    //   ],
    //   quote: {
    //     breakup: [
    //       {
    //         price: {
    //           currency: breakup[0].price.currency,
    //           value: breakup[0].price.value
    //         },
    //         title: breakup?.title
    //       },
    //       {
    //         price: {
    //           currency: breakup[0].price.currency,
    //           value: breakup[0].price.value
    //         },
    //         title: breakup[0].title
    //       }
    //     ],
    //     price: {
    //       currency: data.initProv.quote.price.currency,
    //       value: data.initProv.quote.price.value
    //     }
    //   },
    //   cancellation_terms:[
    //     {
    //       cancellation_fee: {
    //         amount: {
    //             currency: cancellation?.cancellation_fee?.amount?.currency,
    //             value: cancellation?.cancellation_fee?.amount?.value,
    //         },
    //     } ,
    //     }
    //   ],
    //   type: 'DEFAULT'
    // }

    // dispatch(setInitItem(allDetails))

    router.push(`/orderConfirmation?`)
  }
  console.log(initItem)
  return (
    <>
      <Box height={'72vh'} position={'relative'}>
        {/* <AppHeader appHeaderText={t.selectPaymentMethod} /> */}
        <Box>
          <Flex justifyContent={'space-between'} alignItems={'center'} fontSize={'17px'} mb={'10px'}>
            <Text className="text-ellipsis">{t.cards}</Text>
            <Text color={'rgba(var(--color-primary))'} fontSize={'15px'}>
              {t.addCard}
            </Text>
          </Flex>
          <Card className="border_radius_all" mb={'20px'}>
            <CardBody padding={'15px 20px'}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src={creditCardImg} />
            </CardBody>
          </Card>
        </Box>
        <Text marginBottom={'8px'} fontSize={'17px'}>
          Other
        </Text>
        <CardWithCheckBox setChecked={setChecked} paymentMethod={t.payOnline} />
      </Box>
      <Box position={'absolute'} bottom={'10px'} width={'90%'}>
        <Button
          buttonText={t.confirmOrder}
          background={'rgba(var(--color-primary))'}
          color={'rgba(var(--text-color))'}
          isDisabled={!checked}
          handleOnClick={() => {
            fetchDataForConfirm()
          }}
        />
      </Box>
    </>
  )
}

export default PaymentMode
