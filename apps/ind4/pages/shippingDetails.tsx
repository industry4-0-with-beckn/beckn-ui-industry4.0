import React, { useEffect, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { FormErrors, signInValidateForm, signUpValidateForm } from '../utilities/detailsForm-utils'
import style from '../components/detailsCard/ShippingForm.module.css'
import Styles from '../components/signIn/SignIn.module.css'
import { Box, Flex } from '@chakra-ui/react'
import useRequest from '../hooks/useRequest'
import { useRouter } from 'next/router'
import { responseDataActions } from '../store/responseData-slice'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutPage from './checkoutPage'
import Button from '../components/button/Button'
import { setInitItem } from '../store/init-slice'
import { initItem } from '../lib/types/products'

const ShippingDetails = () => {
  const { t } = useLanguage()
  const [formErrors, setFormErrors] = useState<FormErrors>({ name: '', email: '', password: '' })
  const [isFormFilled, setIsFormFilled] = useState(false)
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  const { data, loading, error, fetchData } = useRequest()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const dispatch = useDispatch()

  const router = useRouter()
  const [itemId, setItemId] = useState(router.query?.iId || '')
  const [providerId, setProviderId] = useState(router.query?.pId || '')
  const [fulfillmentId, setFulfillmentId] = useState(router.query?.fId || '')
  const [bppId, setbppId] = useState(router.query?.bId || '')
  const [bppUri, setbppUri] = useState(router.query?.bUri || '')
  const [formData, setFormData] = useState({
    name: 'Santosh Kumar',
    mobileNumber: '9876543210',
    email: 'santosh.k@gmail.com',
    shippingAddress: '151-E, Janpath Road, New Delhi',
    billingAddress: '151-E, Janpath Road, New Delhi',
    zipcode: '201016'
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const initPayload = {
      context: {
        bppId: bppId,
        bppUri: bppUri
      },
      type: 'end',
      itemId: itemId,
      location: '50.313409, 11.912811',
      providerId: providerId,
      fulfillmentId: fulfillmentId,
      name: formData.name,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      shippingAddress: formData.shippingAddress,
      zipcode: formData.zipcode,
      billingAddress: formData.billingAddress
    }
    const fetchDataForInit = () => fetchData(`${apiUrl}/init`, 'POST', initPayload)
    fetchDataForInit()
  }
  if (data) {
    // dispatch(responseDataActions.addTransactionId(data.context.transaction_id))
    const provider = data.initProv.provider
    const items = data.initProv.items
    const fulfillments = data.initProv.fulfillments
    const billing = data.initProv.billing
    const payments = data.initProv.payments
    const breakup = data.initProv.quote.breakup
    const allDetails: initItem = {
      context: {
        bppId: bppId,
        bppUri: bppUri
      },
      provider: {
        id: provider.id,
        descriptor: {
          name: provider.descriptor.name,
          short_desc: provider.descriptor.short_desc,
          long_desc: provider.descriptor.long_desc
          // image: provider.descriptor.images.map((image: any) => image?.url),
        }
      },
      items: [
        {
          id: items[0].id,
          descriptor: {
            name: items[0].descriptor.name
          },
          category_ids: [items[0].category_ids],
          price: {
            currency: items[0].price.currency,
            value: items[0].price.value
          }
        }
      ],
      fulfillments: [
        {
          id: fulfillments[0].id,
          customer: {
            contact: {
              email: fulfillments[0].customer.contact.email,
              phone: fulfillments[0].customer.contact.mobileNumber
            },
            person: {
              name: fulfillments[0].customer.person.name
            }
          },
          stops: [
            {
              type: fulfillments[0]?.stops?.type,
              location: {
                gps: fulfillments[0]?.stops?.location?.gps,
                address: fulfillments[0]?.stops?.location?.address
              },
              contact: {
                phone: fulfillments[0]?.stops[0]?.contact?.phone
              }
            }
          ],
          tracking: fulfillments[0].tracking
        }
      ],
      billing: {
        name: billing.name,
        address: billing.address,
        state: {
          name: billing.state.name
        },
        city: {
          name: billing.city.name
        },
        email: billing.email,
        phone: billing.phone
      },
      payments: [
        {
          collected_by: payments[0].collected_by,
          params: {
            amount: payments[0].params.amount,
            currency: payments[0].params.currency,
            bank_account_number: payments[0].params.bank_account_number,
            bank_code: payments[0].params.bank_code,
            bank_account_name: payments[0].params.bank_account_name
          },
          status: payments[0].status,
          type: payments[0].type
        }
      ],
      quote: {
        breakup: [
          {
            price: {
              currency: breakup[0].price.currency,
              value: breakup[0].price.value
            },
            title: breakup?.title
          },
          {
            price: {
              currency: breakup[0].price.currency,
              value: breakup[0].price.value
            },
            title: breakup[0].title
          }
        ],
        price: {
          currency: data.initProv.quote.price.currency,
          value: data.initProv.quote.price.value
        }
      },
      type: 'DEFAULT'
    }

    dispatch(setInitItem(allDetails))

    router.push(`/checkoutPage?`)
  }

  return (
    <>
      <Box className={Styles.signin_container} pt="40px">
        <div className={style.container}>
          <div className={style.did_floating_label_content}>
            <input
              className={style.did_floating_input}
              type="text"
              placeholder=" "
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label className={style.did_floating_label}>{t.formName}</label>
            {formErrors.name && <div className={style.error}>{formErrors.name}</div>}
          </div>
          <div className={style.did_floating_label_content}>
            <input
              className={style.did_floating_input}
              type="text"
              placeholder=" "
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
            <label className={style.did_floating_label}>{'Mobile Number'}</label>
          </div>
          <div className={style.did_floating_label_content}>
            <input
              className={style.did_floating_input}
              type="text"
              placeholder=" "
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label className={style.did_floating_label}>{t.formEmail}</label>
            {formErrors.email && <div className={style.error}>{formErrors.email}</div>}
          </div>
          <div className={style.did_floating_label_content}>
            <input
              className={style.did_floating_input}
              type="text"
              placeholder=" "
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
            />
            <label className={style.did_floating_label}>{'Shipping Address'}</label>
          </div>
          <div className={style.did_floating_label_content}>
            <input
              className={style.did_floating_input}
              type="text"
              placeholder=" "
              name="zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
            />
            <label className={style.did_floating_label}>{'Zipcode'}</label>
          </div>
          <div className={style.did_floating_label_content}>
            <input
              className={style.did_floating_input}
              type="text"
              placeholder=" "
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
            />
            <label className={style.did_floating_label}>{'Billing Address'}</label>
          </div>
        </div>
      </Box>
      <Button
        buttonText={'Proceed'}
        background={'rgba(var(--color-primary))'}
        color={'rgba(var(--text-color))'}
        handleOnClick={handleSubmit}
        isDisabled={!formData}
      />
      {/* <CheckoutPage initDetails={details}/> */}
    </>
  )
}
export default ShippingDetails
