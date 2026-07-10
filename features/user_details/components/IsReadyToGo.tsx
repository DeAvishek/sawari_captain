import { AuthStore } from '@/features/auth/store/authstore';
import { Focus } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useUpdateDriverStatus } from '../service/useUpdateDriverStatus';
const IsReadyToGo = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const driverId = AuthStore.getState().user?.userID;
  const handleToggle =() => {
    const newValue = !isReady
    setIsReady(newValue)
    const body = {
        value:newValue,
        driverId:driverId
    }
    console.log(body)
    const {updateStatus} = useUpdateDriverStatus();
    updateStatus(body)
    
  };
  return (
    <View style={styles.container}>
    <Focus color='#411ac2' size={30}/>
      <Text style={styles.title}>
        {isReady ? 'Ready to Accept Rides' : 'Not Accepting Rides'}
      </Text>

      <Switch
        value={isReady}
        onValueChange={handleToggle}
        trackColor={{ false: '#767577', true: '#221fc3' }}
        thumbColor="#ffffff"
      />
    </View>
  );
};

export default IsReadyToGo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:5,
    backgroundColor: "rgba(255, 255, 255, 0.55)", // translucent
    borderRadius: 10,
    // elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});