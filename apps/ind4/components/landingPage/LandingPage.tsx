import React, { useState } from 'react'
import Router from 'next/router'
import ImageCard from './ImageCard'
import { useLanguage } from '../../hooks/useLanguage'
import { Box, Flex, Text, Input, Image, Button } from '@chakra-ui/react'
import MapSearch from '../Map/MapSearch'
import useRequest from '../../hooks/useRequest'
// import Button from '../button/Button'
import beckenFooter from '../../public/images/beckenFooterLogo.svg'
import FilterModal from '../filter/FilterModal'
const LandingPage: React.FC = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCard, setActiveCard] = useState<string | null>('course')

  const navigateToSearchResults = () => {
    const optionTags = localStorage.getItem('optionTags')

    const { rating, distance } = JSON.parse(optionTags)

    localStorage.setItem('optionTags', JSON.stringify({ name: searchTerm, rating: rating, distance: distance }))

    Router.push(`/search?searchTerm=${searchTerm}&rating=${rating}&distance=${distance}`)
  }

  const handleClick = (type: string) => {
    setActiveCard(type)
  }

  //filter
  const [isFilterModalOpen, setFilterModalOpen] = useState(false)

  const onFilterCloseNew = val => {
    localStorage.setItem('optionTags', JSON.stringify({ rating: val.ratingValue, distance: val.distanceValue }))
  }
  const [isModalOpen, setModalOpen] = useState(false)
  const handleModalClose = () => {
    setModalOpen(false)
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
          borderRightRadius={'unset'}
          boxShadow="0px 0px 24px rgba(0, 0, 0, 0.10)"
          borderRightRadius={'6px'}
          justifyContent={'center'}
          alignItems="center"
          width={'70px'}
          height={'54px'}
        >
          <Image
            src="/images/searchi.svg"
            onClick={e => {
              if (searchTerm) {
                navigateToSearchResults()
              }
              e.preventDefault()
            }}
            alt={'search icon'}
          />
        </Flex>
        <Flex p={'20px 10px'}></Flex>
        {/* filter */}
        {/* <Flex
          bg={'rgba(var(--color-primary))'}
          borderRightRadius={'8px'}
          boxShadow="0px 0px 24px rgba(0, 0, 0, 0.10)"
          justifyContent={'center'}
          // alignItems="center"
          width={'55px'}
          height={'55px'}
        > */}
        <Button
          type="submit"
          form="new-form"
          onClick={() => setModalOpen(true)}
          background="rgba(var(--color-primary))"
          // color="#FFFFFF"
          align="center"
          width="20%"
          height="55px"
        >
          <Image height={'60px'} width={'180%'} src="/images/filtericon.svg" onClick={() => setModalOpen(true)} />
        </Button>
        <FilterModal isOpen={isModalOpen} onFilterCloseNew={onFilterCloseNew} onClose={handleModalClose}></FilterModal>
        {/* </Flex> */}
      </Flex>

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
