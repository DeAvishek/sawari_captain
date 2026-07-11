import { AuthStore } from '@/features/auth/store/authstore'
import { Clock, LocateIcon, Navigation, RouteIcon, Wallet } from "lucide-react-native"
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useGetRecentTrips } from '../service/useGetRecentTrips'
const RecentTrips = () => {
  const {loading,getRecentTrips,tripDetails} = useGetRecentTrips()
  const phoneNumber = AuthStore.getState().phoneNumber
  useEffect(()=>{
    getRecentTrips(phoneNumber||"")
  },[])
return (
  <View style={style.container}>
    {loading ? (
      <Text style={style.loadingText}>Loading trips...</Text>
    ) : (
      tripDetails.map((item, idx) => (
        <View key={idx} style={style.card}>
          
          {/* Header Area: Trip Marker or Status Icon */}
          <View style={style.cardHeader}>
            <View style={style.iconBadge}>
              <RouteIcon size={16} color="#1E293B" />
            </View>
            <Text style={style.tripTitle}>Trip #{idx + 1}</Text>
          </View>

          {/* Timeline Section (Source & Destination) */}
          <View style={style.timelineContainer}>
            {/* Left Column: Visual connecting line */}
            <View style={style.lineContainer}>
              <LocateIcon size={18} color="#00D2A0" />
              <View style={style.verticalLine} />
              <LocateIcon size={18} color="#EF4444" /> 
            </View>

            {/* Right Column: Address Text */}
            <View style={style.addressContainer}>
              <View style={style.addressBlock}>
                <Text style={style.label}>Pickup Location</Text>
                <Text style={style.addressText} numberOfLines={1}>{item.source}</Text>
              </View>
              
              <View style={style.addressBlock}>
                <Text style={style.label}>Drop Location</Text>
                <Text style={style.addressText} numberOfLines={1}>{item.destination}</Text>
              </View>
            </View>
          </View>

          {/* Footer Metrics Row: Perfect for fares, distance, or time stats */}
          <View style={style.metaRow}>
            <View style={style.metaItem}>
              <Wallet size={14} color="#64748B" />
              <Text style={style.metaText}>{item.fare}</Text> 
            </View>
            
            <View style={style.metaItem}>
              <Navigation size={14} color="#64748B" />
              <Text style={style.metaText}>{item.distance ||"12.4 KM"}</Text>
            </View>

            <View style={style.metaItem}>
              <Clock size={14} color="#64748B" />
              <Text style={style.metaText}>{item.duration||"30 Min"}</Text>
            </View>
          </View>

        </View>
      ))
    )}
  </View>
);
}
const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor:"rgba(255, 255, 255, 0.95)",
    borderRadius:12
  },
  loadingText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    // Soft Drop Shadows
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3, 
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBadge: {
    backgroundColor: 'rgba(0, 210, 160, 0.15)', // 15% Mint brand background tint
    padding: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  tripTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  timelineContainer: {
    flexDirection: 'row',
  },
  lineContainer: {
    alignItems: 'center',
    marginRight: 12,
    paddingVertical: 2,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  addressContainer: {
    flex: 1,
  },
  addressBlock: {
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: '#94A3B8',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  metaRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
    marginTop: 4,
    justifyContent: 'flex-start',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 4,
  },
});

export default RecentTrips