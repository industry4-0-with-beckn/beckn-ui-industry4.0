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
import { initItem } from '../lib/types/products'
import IInititemRootState from '../lib/types/productList'

interface Props {
  initDetails: initItem
}
// const initDetails = location.state?.initDetails
const CheckoutPage: React.FC<Props> = ({ initDetails }) => {
  console.log('dank', initDetails)
  const router = useRouter()
  // const initRequest = useRequest()
  const dispatch = useDispatch()
  const { t, locale } = useLanguage()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  const cartItems = useSelector((state: ICartRootState) => state.cart.items)
  const transactionId = useSelector((state: { transactionId: TransactionIdRootState }) => state.transactionId)
  const bearerToken = Cookies.get('authToken')
  const initDetails = useSelector((state: IInititemRootState) => state.initData.initDetail)

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
          {initDetails && initDetails.descriptor ? (
            <ItemDetails
              title={initDetails.descriptor.name}
              description={initDetails.descriptor.name}
              quantity={initDetails.descriptor.name}
              price={`${t.currencySymbol}${initDetails.quote.price.currency}`}
            />
          ) : (
            <p>Loading or not available</p>
          )}
        </DetailsCard>
        {/* ))} */}
        <DetailsCard>
          {/* {cartItems.map(item => {
            return ( */}
          <>
            <ItemDetails
            // title={item.descriptor.name}
            // provider={(item as any).bppName}
            // quantity={item.quantity}
            // price={item.totalPrice}
            />
          </>
          {/* )
          })} */}
        </DetailsCard>
      </Box>
      {/* end item details */}
      {/* start shipping detals */}
      {/* {!isInitResultPresent() ? ( */}
      <Box>
        <Flex pb={'10px'} mt={'20px'} justifyContent={'space-between'}>
          <Text fontSize={'17px'}>{t.billing}</Text>
        </Flex>
        <DetailsCard></DetailsCard>
      </Box>
      {/* ) : ( */}
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
      {/* )} */}
      {/* end shipping detals */}
      {scholarshipTitle.length !== 0 && (
        <Box>
          <Flex pb={'10px'} mt={'20px'} justifyContent={'space-between'}>
            <Text fontSize={'17px'}>{t.scholarship}</Text>
          </Flex>

          <DetailsCard>
            <Flex alignItems={'center'}>
              <Image alt="shippingBtnImage" src={addShippingBtn} />
              <Text ml={'8px'}>
                <span style={{ fontWeight: 'bold' }}>
                  ‘{scholarshipId}-{scholarshipTitle}’
                </span>
              </Text>
            </Flex>
            <Text ml={'35px'}>{t.scholarshipApplied}</Text>
          </DetailsCard>
        </Box>
      )}
      {/* start payment details */}
      {/* {initRequest.data && ( */}
      <Box>
        <Flex pb={'10px'} mt={'20px'} justifyContent={'space-between'}>
          <Text fontSize={'17px'}>{t.paymentText}</Text>
        </Flex>
        <DetailsCard>
          <PaymentDetails
          // subtotalText={'Sub'}
          // subtotalValue={`${t.currencySymbol} ${getSubTotalAndDeliveryCharges(initRequest.data).subTotal}`}
          // deliveryChargesText={t.scholaarshipApplied}
          // deliveryChargesValue={`- ${t.currencySymbol} ${getSubTotalAndDeliveryCharges(initRequest.data).subTotal}`}
          // totalText={t.totalText}
          // totalValue={'0.00'}
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
