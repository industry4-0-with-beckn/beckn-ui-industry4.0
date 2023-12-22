const OrderDetails = () => {
  // ... (your existing code)

  const renderStatusAccordions = () => {
    const accordions = []

    for (let index = 0; index < statusResponse.length; index++) {
      const status = statusResponse[index]

      // Check if the current status is 'Completed' or 'In Progress'
      if (status === 'Completed' || status === 'In Progress') {
        accordions.push(
          <div key={index}>
            {status === 'Completed' ? (
              <Text fontSize={'12px'} fontWeight="600" color={'#5EC401'}>
                {status}
              </Text>
            ) : (
              <div>
                {/* Add your logic for 'In Progress' status */}
                <Box fontSize={'15px'} color={'rgba(var(--color-primary))'} pt="10px" pl="28px" onClick={handleTrack}>
                  {t.viewCourse}
                </Box>
              </div>
            )}
          </div>
        )
      }
    }

    return accordions
  }

  return (
    <Box className="hideScroll" maxH={'calc(100vh - 100px)'} overflowY="scroll">
      {/* ... (your existing code) */}
      <Accordion
        accordionHeader={
          <Box>
            {/* ... (your existing code) */}
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Flex maxWidth={'57vw'}>
                <Text
                  textOverflow={'ellipsis'}
                  overflow={'hidden'}
                  whiteSpace={'nowrap'}
                  fontSize={'12px'}
                  fontWeight={'400'}
                >
                  {pname}
                </Text>
              </Flex>

              {renderStatusAccordions()}
            </Flex>
          </Box>
        }
      >
        {/* ... (your existing code) */}
      </Accordion>
    </Box>
  )
}

export default OrderDetails
