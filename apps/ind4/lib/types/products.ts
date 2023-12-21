export interface IProductDetails {
  processor?: string
  screen?: string
  operating_system?: string
  ram?: string
  ssd?: string
  ports?: string
  graphic?: string
  warranty?: string
  back_camera?: string
  front_camera?: string
  battery?: string
  frequency_response?: string
  microphone?: boolean
  wireless?: boolean
  wireless_standby_time?: boolean
  connectionType?: string[]
  connectors?: string[]
  bluetooth?: boolean
  noise_cancelling?: boolean
  sound_isolating?: boolean
}

export type TSlug = {
  _type: string
  current: string
}

export type TImage = {
  _key: string
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface IProduct {
  image: any
  name: string
  slug: TSlug
  price: number
  discount?: number
  details?: IProductDetails[]
  brand: string
  category: string[]
  isOffer?: boolean
  registerDate?: string
  timeStamp?: number
  starRating: number
}

/**
 * New types for the retail
 */

export interface RetailItem {
  extended_attributes?: any
  context?: {
    bppId?: string
    bppUri?: string
  }
  price: {
    listed_value?: string
    currency?: string
    value: string
  }
  matched?: boolean
  id: string
  descriptor: {
    images: string[]
    name: string
    short_desc: string
    long_desc: string
  }
  rating?: string
  items?: [
    {
      id?: string
    }
  ]
  location?: {
    code?: string
    name?: string
    gps?: string
  }
  location_id?: string
  recommended?: boolean
  tags: {
    fulfillment_start_loc?: string
    Category?: string
    Trekking?: string
    Himalayas?: string
    fulfillment_end_time?: string
    Country?: string
    Ladakh?: string
    Treks?: string
    Package?: string
    Leh?: string
    fulfillment_end_loc?: string
    authorName: string
    Rating: string
    foodType?: string
  }
  bppName?: string
}

export interface initItem {
  context?: {
    bppId?: string
    bppUri?: string
  }
  id: string
  descriptor?: {
    name?: string
    short_desc?: string
    long_desc?: string
  }
  rating?: string
  items?: {
    id?: string
  }[]

  fulfillments?: {
    id?: string

    customer?: {
      contact?: {
        email?: string
        phone?: string
      }
      person?: {
        name?: string
      }
      stops?: {
        type?: string
        location?: {
          gps?: string
          address?: string
        }
        contact?: {
          phone?: string
        }
      }[]
    }

    tracking?: string
  }

  billing?: {
    name?: string
    address?: string
    state?: {
      name?: string
    }
    city?: {
      name?: string
    }
    email?: string
    phone?: string
  }

  payments?: {
    collected_by?: string
    params?: {
      amount?: string
      currency?: string
      bank_account_number?: string
      bank_code?: string
      bank_account_name?: string
    }
    status?: string
    type?: string
  }[]

  quote?: {
    breakup?: {
      price?: {
        currency?: string
        value?: string
      }
      title?: string
    }[]
    price?: {
      currency?: string
      value?: string
    }
  }
}

export interface IInititemRootState {
  initDetail: initItem
}

export interface ConfirmItem extends initItem {
  cancellation_terms?: {
    cancellation_fee: {
      amount: {
        currency: string
        value: string
      }
    }
  }[]
}

export interface ConfirmRootState {
  confirmDetail: ConfirmItem
}

/*

 const confirmProv = {
    order:{
      id: input?.message?.order?.id,
      provider: {
        id: provider?.id,
        descriptor:{
        name: provider?.descriptor?.name,
        short_desc: provider?.descriptor?.short_desc,
        long_desc: provider?.descriptor?.long_desc,
        image: provider?.descriptor?.images?.map((image: any) => image?.url),
        },
      },
        items:[
          {
            id: item?.id,
            descriptor:{
              name: item?.descriptor?.name,
            },
            category_ids: [
              item?.category_ids,
            ],
            price: {
              currency: item?.price?.currency,
              value: item?.price?.value,
          }
          },
        ], 
        fulfillments: [{
          id: fulfillment?.id,
          state: {
            descriptor: {
                code: fulfillment?.state?.descriptor?.code,
                short_desc:  fulfillment?.state?.descriptor?.short_desc
            }
        },
              customer:{
                contact:{
                  email: fulfillment?.customer?.contact?.email,
                  phone: fulfillment?.customer?.contact?.mobileNumber,
                },
                person: {
                  name: fulfillment?.customer?.person?.name,
                }
              },
              stops:[
                {
                  type: fulfillment?.stops[0]?.type,
                  location:{
                    gps:fulfillment?.stops[0]?.location?.gps,
                    address: fulfillment?.stops[0]?.location?.address,
                  },
                  contact: {
                    phone: fulfillment?.stops[0]?.contact?.phone
                  }
                },
              ],
              tracking: fulfillment?.tracking,
          
        }],
        billing:{
          name: input?.message?.order?.billing?.name,
          address:input?.message?.order?.billing?.address,
          state:{
            name: input?.message?.order?.billing?.state?.name,
          },
          city:{
            name:input?.message?.order?.billing?.city?.name,
          },
          email: input?.message?.order?.billing?.email,
          phone: input?.message?.order?.billing?.phone
        },
        payments: [
          {
              collected_by: payments?.collected_by,
              params: {
                  amount: payments?.params?.amount,
                  currency: payments?.params?.currency,
                  bank_account_number: payments?.params?.bank_account_number,
                  bank_code: payments?.params?.params?.bank_code,
                  bank_account_name: payments?.params?.bank_account_name
              },
              status: payments?.status,
              type: payments?.type,
              transaction_id: payments?.transaction_id
          }
      ],
      quote: {
          breakup: [
              {
                  price: {
                      currency: breakup?.price?.currency,
                      value: breakup?.price?.value,
                  },
                  title: breakup?.title
              },
              {
                price: {
                  currency: breakup?.price?.currency,
                  value: breakup?.price?.value,
              },
                title: breakup?.title
              },
              
          ],
          price: {
              currency: input?.message?.order?.quote?.price?.currency,
              value: input?.message?.order?.quote?.price?.value
          }
      },
      cancellation_terms:[
        {
          cancellation_fee: {
            amount: {
                currency: cancellation?.cancellation_fee?.amount?.currency,
                value: cancellation?.cancellation_fee?.amount?.value,
            },
        } , 
        }
      ]
      
      type: "DEFAULT"
    }
   
  };
*/
