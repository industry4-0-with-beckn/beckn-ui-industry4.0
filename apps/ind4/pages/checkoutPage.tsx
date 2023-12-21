import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Flex, Text, Stack, Checkbox, Image } from '@chakra-ui/react'
import DetailsCard from '../components/detailsCard/DetailsCard'
import ItemDetails from '../components/detailsCard/ItemDetails'
import ButtonComp from '../components/button/Button'
import { useLanguage } from '../hooks/useLanguage'
import ShippingOrBillingDetails from '../components/detailsCard/ShippingOrBillingDetails'
import PaymentDetails from '../components/detailsCard/PaymentDetails'
import AddShippingButton from '../components/detailsCard/AddShippingButton'
import addShippingBtn from '../public/images/offer.svg'
import { CartItemForRequest, DataPerBpp, ICartRootState, TransactionIdRootState } from '../lib/types/cart'
import useRequest from '../hooks/useRequest'
import Loader from '../components/loader/Loader'
// import AddBillingButton from '../components/detailsCard/AddBillingButton'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { selectInitItem } from '../store/init-slice'
import { AppHeader } from '../components/appHeader/AppHeader'

// const initDetails = location.state?.initDetails
const CheckoutPage = () => {
  const router = useRouter()
  // const initRequest = useRequest()
  const { t, locale } = useLanguage()
  const initItem = useSelector(selectInitItem)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  const cartItems = useSelector((state: ICartRootState) => state.cart.items)
  const transactionId = useSelector((state: { transactionId: TransactionIdRootState }) => state.transactionId)
  const bearerToken = Cookies.get('authToken')
  const totalValue = initItem?.quote?.price?.value ?? '0.0'
  const basePrice = initItem?.quote?.breakup[0].price?.value ?? '0.0'
  const difference = totalValue - basePrice
  const id = initItem?.id
  const description = initItem?.context?.bppId
  console.log(id)
  // const initItem = useSelector((state: IInititemRootState)=> state.initDetail.id)
  return (
    <Box className="hideScroll" maxH={'calc(100vh - 100px)'} overflowY="scroll">
      {/* <AppHeader appHeaderText={t.checkout} /> */}
      {/* start Item Details */}
      <Box>
        <Box pb={'10px'}>
          <Text fontSize={'17px'}>{t.overview}</Text>
        </Box>
        {/* {cartItems.map((item) => ( */}
        <DetailsCard>
          <ItemDetails title={id} description={description} quantity={'Quote Details'} price={basePrice} />
        </DetailsCard>
        {/* ))} */}
        <DetailsCard>
          {/* {cartItems.map(item => {
            return ( */}
          <>
            <ItemDetails title={id} description={description} quantity={'Quote Details'} price={basePrice} />
          </>
          {/* )
          })} */}
        </DetailsCard>
      </Box>

      {/* <Box>
        <Flex pb={'10px'} mt={'20px'} justifyContent={'space-between'}>
          <Text fontSize={'17px'}>{t.billing}</Text>
        </Flex>
        <DetailsCard></DetailsCard>
      </Box> */}

      <Box>
        <Flex pb={'10px'} mt={'20px'} justifyContent={'space-between'}>
          {/* <Text fontSize={'17px'}>{t.billing}</Text> */}
          {/* <AddBillingButton
              // imgFlag={!isInitResultPresent()}
              // billingFormData={formData}
              // setBillingFormData={setFormData}
              addBillingdetailsBtnText={t.changeText}
              // billingFormSubmitHandler={formSubmitHandler}
            /> */}
        </Flex>

        {/* <ShippingOrBillingDetails
            accordionHeader={t.billing}
            name={formData.name}
            location={formData.address}
            number={formData.mobileNumber}
          /> */}
      </Box>

      <Box>
        <Flex pb={'10px'} mt={'20px'} justifyContent={'space-between'}>
          <Text fontSize={'17px'}>{'Billing Details'}</Text>
        </Flex>
        <DetailsCard>
          <PaymentDetails
            subtotalText={'Base Price'}
            subtotalValue={`${t.eurosymbol} ${basePrice}`}
            deliveryChargesText={'Shipping Charges'}
            deliveryChargesValue={`${t.eurosymbol} ${difference}`}
            totalText={t.totalText}
            totalValue={totalValue}
          />
        </DetailsCard>
      </Box>
      {/* )} */}
      {/* end payment details */}
      {/* {!isInitResultPresent() ? ( */}
      <Box position={'absolute'} left={'5%'} width={'90%'} bottom={'0'}>
        {/* <ButtonComp
            buttonText={t.continue}
            background={'rgba(var(--color-primary))'}
            color={'rgba(var(--text-color))'}
            handleOnClick={() => {}}
            isDisabled={true}
          /> */}
      </Box>
      {/* ) : ( */}
      <ButtonComp
        buttonText={t.continue}
        background={'rgba(var(--color-primary))'}
        color={'rgba(var(--text-color))'}
        handleOnClick={() => router.push('/paymentMode')}
        isDisabled={false}
      />
      {/* )} */}
    </Box>
  )
}
export default CheckoutPage
