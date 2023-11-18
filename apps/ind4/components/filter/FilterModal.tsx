import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import style from '../../components/detailsCard/ShippingForm.module.css'
import { Image, FormControl, FormLabel, Button, FormHelperText, useDisclosure } from '@chakra-ui/react'

export interface FilterProps {
  onFilterCloseNew: (val: any) => void
  isOpen: boolean
}
const FilterModal: React.FC<FilterProps> = ({ isOpen, onFilterCloseNew, onClose }) => {
  const [ratingValue, setRatingValue] = useState('')
  const [distanceValue, setDistanceValue] = useState('')
  const handleSave = e => {
    e.preventDefault()
    onFilterCloseNew({ ratingValue: ratingValue, distanceValue: distanceValue })
    onClose()
  }

  return (
    <Transition show={isOpen}>
      <div className="fixed z-[9999] inset-0 flex items-end justify-center  sm:p-0">
        <Transition.Child
          unmount={false}
          enter="transition-transform duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
          style={{ width: '100vw' }}
        >
          <div className="w-full   px-8 pb-4 pt-2 mx-auto bg-[#F3F4F5]  rounded-t-[1rem] shadow-lg sm:rounded-lg sm:overflow-hidden">
            <form id="new-form">
              <FormControl>
                <FormLabel>
                  <FormHelperText>All Filters</FormHelperText>
                  <input
                    className={style.did_floating_input}
                    type="text"
                    placeholder="Distance in miles"
                    onChange={(e: React.BaseSyntheticEvent) => setDistanceValue(e.target.value)}
                  />
                </FormLabel>
                <FormLabel>
                  <FormHelperText></FormHelperText>
                  <input
                    className={style.did_floating_input}
                    type="text"
                    placeholder="Rating"
                    onChange={(e: React.BaseSyntheticEvent) => setRatingValue(e.target.value)}
                  />
                </FormLabel>
              </FormControl>
            </form>
            <Button
              type="submit"
              form="new-form"
              onClick={handleSave}
              background="rgba(var(--color-primary))"
              color="#FFFFFF"
              align="center"
              width="100%"
            >
              Apply Filter
            </Button>
            <Image src="/images/Indicator.svg" className="mx-auto mb-3" alt="indicator" />
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}

export default FilterModal
