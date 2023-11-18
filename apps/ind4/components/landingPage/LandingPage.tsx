import React, { useState } from 'react'
import Router from 'next/router'
import BottomModal from '../BottomModal'
import ImageCard from './ImageCard'
import { useLanguage } from '../../hooks/useLanguage'
import { Box, Flex, Text, Input, Image } from '@chakra-ui/react'
import MapSearch from '../Map/MapSearch'
import useRequest from '../../hooks/useRequest'
import Style from './landingpage.css'
import style from '../../components/detailsCard/ShippingForm.module.css'
import Button from '../button/Button'
import beckenFooter from '../../public/images/beckenFooterLogo.svg'
import FilterModal from '../filter/FilterModal'

const LandingPage: React.FC = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCard, setActiveCard] = useState<string | null>('course')
  // const [rating,setRating] = useState('')
  // const rating;
  const navigateToSearchResults = () => {
    const optionTags = localStorage.getItem('optionTags')
    const { rating } = JSON.parse(optionTags)
    console.log('dank rating', rating)
    localStorage.setItem('optionTags', JSON.stringify({ name: searchTerm, rating: rating }))
    // debugger;
    console.log('dank term', rating, searchTerm)
    Router.push(`/search?searchTerm=${searchTerm}&rating=${rating}`)
  }

  const handleClick = (type: string) => {
    setActiveCard(type)
  }

  //filter
  const [isFilterModalOpen, setFilterModalOpen] = useState(false)
  // const handleFilterModalClose = (ratingvalue) => {
  //   // setRating(ratingvalue)
  //   localStorage.setItem('optionTags', JSON.stringify({rating: ratingvalue }))
  //   console.log("dank set",ratingvalue )
  // }

  const onFilterCloseNew = val => {
    localStorage.setItem('optionTags', JSON.stringify({ rating: val }))
  }

  //location search bar
  const [query, setQuery] = useState<string>('')
  const [coords, setCoords] = useState<Coords>({
    lat: 48.800345,
    long: 2.346078
  })
  const { data: searchedLocationData, loading, error, fetchData } = useRequest()
  const { data: locationData, loading: loadingLocation, error: locationError, fetchData: fetchLocation } = useRequest()
  const handleLocationClick = (lat: number, long: number) => {
    setCoords({ lat, long })
  }
  const fetchLocationByQuery = (query: string) => {
    let url = `${process.env.NEXT_PUBLIC_NOMINATIM_URL}/search?format=jsonv2&q=${query}`

    fetchData(url, 'GET')
  }

  const fetchLocationNameByCoords = (lat: number, long: number) => {
    let url = `${process.env.NEXT_PUBLIC_NOMINATIM_URL}/reverse?format=jsonv2&lat=${lat}&lon=${long}`

    fetchLocation(url, 'GET')
  }
  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <Box p={'20px'}>
      <Text fontSize={'40px'} fontWeight="800" color={'rgba(var(--color-primary))'} pt="30px" lineHeight={'40px'}>
        {t.homeHeading}
      </Text>
      <Text fontSize={'27px'} fontWeight="800" pb={'15px'}>
        {t.headingSpan}
      </Text>
      <Text fontSize={'15px'}>{t.homeText}</Text>
      {/* locationbar */}
      <MapSearch
        setQuery={setQuery}
        locations={searchedLocationData as any}
        query={query}
        handleLocationClick={handleLocationClick}
        fetchResults={fetchLocationByQuery}
        setShowSuggestions={setShowSuggestions}
      />

      <Flex pt={'25px'}>
        <Input
          boxShadow="0px 0px 24px rgba(0, 0, 0, 0.10)"
          borderRightRadius={'unset'}
          p={'26px 15px'}
          type="text"
          name="search_input"
          placeholder="Search for a service"
          onChange={(e: React.BaseSyntheticEvent) => setSearchTerm(e.target.value)}
          onKeyDown={event => event.key === 'Enter' && navigateToSearchResults()}
          _focusVisible={{
            borderColor: 'transparent',
            boxShadow: 'transparent'
          }}
        />
        <Flex
          // bg={'rgba(var(--color-primary))'}
          borderRightRadius={'6px'}
          boxShadow="0px 0px 24px rgba(0, 0, 0, 0.10)"
          justifyContent={'center'}
          alignItems="center"
          width={'55px'}
        >
          <Image
            src="/images/searchIcon.svg"
            onClick={e => {
              if (searchTerm) {
                navigateToSearchResults()
              }
              e.preventDefault()
            }}
            alt={'search icon'}
          />
        </Flex>
        {/* filter */}
        <Flex
          bg={'rgba(var(--color-primary))'}
          borderRightRadius={'6px'}
          boxShadow="0px 0px 24px rgba(0, 0, 0, 0.10)"
          justifyContent={'center'}
          alignItems="center"
          width={'55px'}
        >
          {/* <Image
            src="/images/filter.svg"
            onClick={() => setFilterModalOpen(true)}
          /> */}
          <FilterModal onFilterCloseNew={onFilterCloseNew}></FilterModal>
        </Flex>
      </Flex>
      {/* emptyboximage */}
      {/* <Image className={Style.emptybox} src={EmptyBox} alt="emptybox" width={276} height={116} /> */}

      <Flex justifyContent={'center'} alignItems="center" width=" calc(100% - 40px)" position={'fixed'} bottom="15px">
        <Text pr={'8px'} fontSize="10px">
          {t.footerText}
        </Text>
        <Image src={beckenFooter} alt="footerLogo" width={39} height={13} />
      </Flex>
    </Box>
  )
}

export default LandingPage
