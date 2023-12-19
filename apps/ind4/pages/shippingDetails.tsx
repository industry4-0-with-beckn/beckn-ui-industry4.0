import React, { useEffect, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { FormErrors, signInValidateForm, signUpValidateForm } from '../utilities/detailsForm-utils'
import style from '../components/detailsCard/ShippingForm.module.css'
import Styles from '../components/signIn/SignIn.module.css'
import { Box, Flex } from '@chakra-ui/react'
import useRequest from '../hooks/useRequest'
import { useRouter } from 'next/router'
import { responseDataActions } from '../store/responseData-slice'
import { useDispatch } from 'react-redux'

import Button from '../components/button/Button'

const ShippingDetails = () => {
  const { t } = useLanguage()
  const [formErrors, setFormErrors] = useState<FormErrors>({ name: '', email: '', password: '' })
  const [isFormFilled, setIsFormFilled] = useState(false)
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  const { data, loading, error, fetchData } = useRequest()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const dispatch = useDispatch()

  // const initRequest = useRequest()
  const router = useRouter()
  const [itemId, setItemId] = useState(router.query?.iId || '')
  const [providerId, setProviderId] = useState(router.query?.pId || '')
  const [fulfillmentId, setFulfillmentId] = useState(router.query?.fId || '')
  const [bppId, setbppId] = useState(router.query?.bId || '')
  const [bppUri, setbppUri] = useState(router.query?.bUri || '')
  const [details, setDetails] = useState()
  const [formData, setFormData] = useState({
    name: 'e.g. Santosh Kumar',
    mobileNumber: '9876543210',
    email: 'santosh.k@gmail.com',
    shippingAddress: '151-E, Janpath Road, New Delhi',
    billingAddress: '151-E, Janpath Road, New Delhi',
    zipcode: '201016'
  })

  console.log('bppid', bppId)
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
    dispatch(responseDataActions.addTransactionId(data.context.transaction_id))
    const provider = data.initProv
    const allDetails = {
      context: {
        bppId: bppId,
        bppUri: bppUri
      }
    }
    router.push(`/checkoutPage?pId=${providerId}&iId=${itemId}&fId=${fulfillmentId}&bppId=${bppId}&bppUri=${bppUri}`)
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
    </>
  )
}
export default ShippingDetails
