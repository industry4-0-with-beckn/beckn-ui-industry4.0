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
  const handleCancel = e => {
    e.preventDefault()
    onFilterCloseNew({ ratingValue: '1', distanceValue: '0.0' })
    onClose()
  }

  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 bg-gray-500 opacity-75 fixed z-[9999] inset-0 flex items-end justify-center  sm:p-0">
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
          <div className="w-full px-8 pb-4 pt-2 mx-auto bg-[#FFFFFF]  rounded-t-[1rem] shadow-lg sm:rounded-lg sm:overflow-hidden">
            <form id="new-form">
              <FormControl>
                <FormLabel>
                  <div className="space-y-8">
                    <FormHelperText className="text-base">All Filters</FormHelperText>
                  </div>
                  <div className="space-y-8">
                    <FormHelperText>Distance in miles</FormHelperText>
                  </div>

                  <input
                    className={style.did_floating_input}
                    type="text"
                    placeholder="e.g. 4"
                    onChange={(e: React.BaseSyntheticEvent) => setDistanceValue(e.target.value)}
                  />
                </FormLabel>

                <FormLabel>
                  <FormHelperText>Rating</FormHelperText>
                  <input
                    className={style.did_floating_input}
                    type="text"
                    placeholder="e.g. 3"
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
              width="100%"
            >
              Apply Filter
            </Button>
            <div className="space-y-8">
              <Button
                type="submit"
                form="new-form"
                onClick={handleCancel}
                // borderColor="rgba(var(--color-primary))"
                color="#0560FA"
                align="center"
                width="100%"
              >
                Cancel
              </Button>
            </div>
            <Image src="/images/Indicator.svg" className="mx-auto mb-3" alt="indicator" />
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}

export default FilterModal
