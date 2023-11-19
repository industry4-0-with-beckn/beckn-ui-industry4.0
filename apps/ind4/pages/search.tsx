import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@chakra-ui/react'
import SearchBar from '../components/header/SearchBar'
import ProductList from '../components/productList/ProductList'
import useRequest from '../hooks/useRequest'
import { responseDataActions } from '../store/responseData-slice'
import { IndustryItem } from '../lib/types/products'
import { RetailItem } from '../lib/types/products'
import Loader from '../components/loader/Loader'
import { useRouter } from 'next/router'
import { useLanguage } from '../hooks/useLanguage'
//Mock data for testing search API. Will remove after the resolution of CORS issue

const Search = () => {
  const [items, setItems] = useState([])
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState(router.query?.searchTerm || '')
  const [filterRating, setFilterRating] = useState(router.query?.rating || '')
  const [filterDistance, setFilterDistance] = useState(router.query?.distance || '')
  const dispatch = useDispatch()
  const [providerId, setProviderId] = useState('')
  const { t, locale } = useLanguage()
  const [tagValue, setTagValue] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const { data, loading, error, fetchData } = useRequest()

  useEffect(() => {
    if (!!searchKeyword) {
      localStorage.removeItem('searchItems')
      localStorage.setItem('optionTags', JSON.stringify({ name: searchKeyword }))

      window.dispatchEvent(new Event('storage-optiontags'))
      fetchDataForSearch()
    }
    if (localStorage) {
      const stringifiedOptiontags = localStorage.getItem('optionTags')
      const stringifiedSelectedOption = localStorage.getItem('selectedOption')
      if (stringifiedOptiontags) {
        const providerId = JSON.parse(stringifiedOptiontags).providerId
        setProviderId(providerId)
      }
      if (stringifiedSelectedOption) {
        setTagValue(JSON.parse(stringifiedSelectedOption).tagValue)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword])

  const searchPayload = {
    searchTitle: searchKeyword,
    userLocation: '50.313409, 11.912811',
    userRadiustype: 'CONSTANT',
    userRadiusvalue: `${filterDistance}`,
    userRadiusunit: 'miles',
    userRating: `gte>${filterRating}`
  }
  // const fetchDataForSearch = () => fetchData(`${apiUrl}/client/v2/search`, 'POST', searchPayload)
  const fetchDataForSearch = () => fetchData(`${apiUrl}/search`, 'POST', searchPayload)
  useEffect(() => {
    if (localStorage && !localStorage.getItem('searchItems')) {
      if (providerId) {
        fetchData(`${apiUrl}/client/v2/search`, 'POST', searchPayload)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId])

  useEffect(() => {
    if (localStorage) {
      const cachedSearchResults = localStorage.getItem('searchItems')
      if (cachedSearchResults) {
        const parsedCachedResults = JSON.parse(cachedSearchResults)
        setItems(parsedCachedResults)
      }
    }
  }, [])

  //==============
  useEffect(() => {
    if (data) {
      dispatch(responseDataActions.addTransactionId(data.context.transaction_id))

      let allItems = data.serviceProviders.map((provider: any) => {
        return {
          price: {
            value: provider.items[0].value,
            currency: provider.items[0].currency
            // value: "50",
          },
          id: provider.id,
          descriptor: {
            // images: ["https://www.https://images.pexels.com/photos/5532675/pexels-photo-5532675.jpeg://www.istockphoto.com/en/photo/automation-industry-concept-gm1165956623-321001419?phrase=assembly%2Bline.com/en/photo/metal-conveyers-move-boxes-inside-the-warehouse-with-shelves-and-loader-3d-gm1400564679-454098160?phrase=assembly%2Bline"],
            images: provider.images ?? [
              'https://images.pexels.com/photos/5532672/pexels-photo-5532672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            ],
            name: provider.name,
            short_desc: provider.short_desc,
            long_desc: provider.long_desc
          },
          rating: provider.rating,
          tags: {
            authorName: 'Industry 4.0',
            rating: '5'
          },
          location: {
            code: provider.location[0].code,
            name: provider.location[0].name,
            gps: provider.location[0].gps
          }
        }
      })
      localStorage.setItem('searchItems', JSON.stringify(allItems))
      setItems(allItems)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <>
      <Box
        height={'61px'}
        ml={'-20px'}
        mr={'-20px'}
        position={'fixed'}
        zIndex={'9'}
        background={'#fff'}
        width={'100%'}
        mt={'-20px'}
      >
        <SearchBar
          searchString={searchKeyword}
          handleChange={(text: string) => {
            setSearchKeyword(text)
            localStorage.removeItem('optionTags')
            localStorage.setItem('optionTags', JSON.stringify({ name: text }))
            window.dispatchEvent(new Event('storage-optiontags'))
            fetchDataForSearch()
          }}
        />
      </Box>
      <div>
        {loading ? (
          <div>
            <Loader
              stylesForLoadingText={{
                fontWeight: '600',
                fontSize: '16px'
              }}
              subLoadingText={t.servicesCatalogLoader}
              loadingText={t.catalogLoader}
            />
          </div>
        ) : (
          <ProductList productList={items} />
        )}
      </div>
    </>
  )
}

export default Search
