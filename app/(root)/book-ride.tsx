import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import RideLayout from '@/components/RideLayout'
import { useDriverStore, useLocationStore } from '@/store'
import { icons } from '@/constants'
import { formatTime } from '@/lib/utils'
import { useUser } from '@clerk/clerk-expo'

const BookRide = () => {
  const {user}=useUser()
  const { selectedDriver, drivers } = useDriverStore()
  const { userAddress, destinationAddress } = useLocationStore()
  const detail = drivers.find((driver) => driver.id === selectedDriver)

  return (
    <RideLayout title="Book Ride">
      <>
      <Text style={{fontSize:25,fontWeight:"bold", marginBottom:10}}>
        Ride Information
      </Text>
      <View style={styles.container}>
  
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: detail?.profile_image_url }}
            style={styles.driverImage}
          />
          <View style={styles.driverInfoRow}>
            <Text style={styles.driverName}>
              {detail?.first_name} {detail?.last_name}
            </Text>
            <Image source={icons.star} style={styles.starIcon} />
            <Text style={styles.rating}>{detail?.rating}</Text>
          </View>
        </View>


        <View style={styles.rideCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Ride Price</Text>
            <Text style={styles.price}>
              ${detail?.price ?? 20}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Pickup Time</Text>
            <Text style={styles.value}>
              {formatTime(detail?.time || 5)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Car Seats</Text>
            <Text style={styles.value}>{detail?.car_seats}</Text>
          </View>
        </View>

        
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <Image source={icons.to} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={2}>
              {userAddress}
            </Text>
          </View>

          <View style={styles.locationRow}>
            <Image source={icons.point} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={2}>
              {destinationAddress}
            </Text>
          </View>
        </View>
      </View>
      </>
    </RideLayout>
  )
}

export default BookRide

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,           
  },

  imageContainer: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 20,                
  },
  driverImage: {
    width: 116,                      
    height: 116,
    borderRadius: 58,
    backgroundColor: '#f0f0f0',
  },
  driverInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },
  driverName: {
    fontSize: 23,                    
    fontWeight: '700',
    color: '#111',
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  rating: {
    fontSize: 17,
    fontWeight: '700',
    color: '#444',
  },

  rideCard: {
    backgroundColor: '#bad5f0',
    borderRadius: 24,
    paddingVertical: 12,            
    paddingHorizontal: 28,           
    marginBottom: 20,                
    borderWidth: 1,
    borderColor: '#75a5e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,             
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f8',
  },
  label: {
    fontSize: 17,                    
    fontWeight: '600',
    color: '#444',
  },
  price: {
    fontSize: 19,                    
    fontWeight: '700',
    color: '#0cc25f',
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },

  locationContainer: {
    marginTop: 12,                   
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,             
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 14,
  },
  locationIcon: {
    width: 26,
    height: 26,
  },
  locationText: {
    fontSize: 17,                    
    fontWeight: '600',
    color: '#111',
    flex: 1,
    lineHeight: 24,
  },
});