import React, { useState, useRef } from 'react'
import Router from 'next/router'
// import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Text,
  Input,
  Image,
  useDisclosure,
  Modal,
  Button,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  Lorem,
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react'
import MapSearch from '../Map/MapSearch'
import useRequest from '../../hooks/useRequest'
import style from '../../components/detailsCard/ShippingForm.module.css'
import Styles from '../../components/signIn/SignIn.module.css'

export interface FilterProps {
  onFilterCloseNew: (val: any) => void
  //   onFilterCloseNew: boolean
  //   onClose: () => void
  //   children: React.ReactNode
  //   partialClose?: boolean
}

// const { isOpen, onOpen, onClose } = useDisclosure()

const FilterModal: React.FC<FilterProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const isFilterModalOpen = props.isFilterModalOpen
  // const onFilterModalClose = props.onFilterModalClose
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [ratingValue, setRatingValue] = useState('')
  const handleSave = e => {
    // Perform any necessary validations or actions
    // Pass the value to the callback to update state in the parent component
    e.preventDefault()
    props.onFilterCloseNew(ratingValue)
    onClose()
    // onClose(ratingValue);
  }

  return (
    <>
      <Button onClick={onOpen} background="rgba(var(--color-primary))" color="#FFFFFF">
        Filter
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form id="new-form">
              <FormControl>
                <FormLabel>
                  <FormHelperText>All Filters</FormHelperText>
                  {/* <input
                    className={style.did_floating_input}
                    type="text"
                    placeholder="Distance"
                    name="name"
                    onChange={(e: React.BaseSyntheticEvent) => setDistance(e.target.value)}
                    // value={formData.name}
                    // onChange={handleInputChange}
                  />  */}
                </FormLabel>
                <FormLabel>
                  <FormHelperText></FormHelperText>
                  <input
                    className={style.did_floating_input}
                    type="text"
                    placeholder="Rating"
                    // name="name"
                    onChange={(e: React.BaseSyntheticEvent) => setRatingValue(e.target.value)}
                    // value={formData.name}
                    // onChange={handleInputChange}
                  />
                </FormLabel>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="new-form"
              onClick={handleSave}
              background="rgba(var(--color-primary))"
              color="#FFFFFF"
              align="center"
            >
              Apply Filter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default FilterModal
