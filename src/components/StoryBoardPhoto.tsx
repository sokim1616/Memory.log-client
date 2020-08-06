import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();
import {StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

interface StoryBoardPhotoProps {}

const StoryBoardPhoto: React.FC<StoryBoardPhotoProps> = ({
  photo,
  handlePhotoTouch,
  handleAddToDeleteList,
  deleteMode,
}) => {
  const [onCancelList, setOnCancelList] = useState(false);

  useEffect(() => {
    setOnCancelList(false);
  }, [deleteMode]);

  return (
    <TouchableOpacity
      onPress={() => handlePhotoTouch(photo)}
      style={styles.photoView}>
      <Image
        resizeMode="cover"
        style={deleteMode && onCancelList ? styles.onDeletePhoto : styles.photo}
        source={{uri: photo.filepath}}
      />
      {deleteMode && photo ? (
        <TouchableOpacity
          onPress={() => {
            handleAddToDeleteList(photo.filepath);
            setOnCancelList(!onCancelList);
          }}
          style={styles.onPhotoDeleteIconContainer}>
          <MaterialCommunityIcons
            name={'window-close'}
            style={styles.onPhotoDeleteIcon}
            color={'black'}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  photoView: {
    flex: 0.25,
    flexDirection: 'row',
    marginVertical: 5,
    minWidth: Dimensions.get('window').width / 4 - 18,
    maxWidth: 93,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2.5},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  photo: {
    flex: 1,
    height: Dimensions.get('screen').height / 8 - 12,
    borderRadius: 5,
    borderColor: 'blue',
  },
  onDeletePhoto: {
    flex: 1,
    height: Dimensions.get('screen').height / 8 - 12,
    borderRadius: 5,
    borderColor: 'blue',
    opacity: 0.5,
  },
  onPhotoDeleteIconContainer: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  onPhotoDeleteIcon: {
    color: 'black',
    fontSize: 22,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 2.5, height: 2.5},
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});

export default StoryBoardPhoto;
