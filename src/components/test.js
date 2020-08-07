<Overlay
  overlayStyle={styles.upperview__right__message__overlay}
  isVisible={visibleName}
  onBackdropPress={toggleName}>
  <View style={styles.overlay}>
    <View style={styles.overlay__title}>
      <Text style={styles.overlay__title__text}>유저 이름 변경</Text>
    </View>
    <View style={styles.overlay__textinput}>
      <Input
        containerStyle={styles.overlay__textinput__container}
        inputContainerStyle={styles.overlay__textinput__input}
        inputStyle={{fontSize: 25}}
        placeholder="새로운 이름를 입력하세요."
        multiline={true}
        maxLength={10}
        onChangeText={handleTextInput}
        value={statusName}
      />
    </View>
    <Text style={styles.overlay__textinput__legnth}>
      {statusName ? `${statusName.length} / 10` : '0 / 10'}
    </Text>
    <View style={styles.overlay__textinput__line} />
    <View style={styles.overlay__button}>
      <Button
        containerStyle={styles.overlay__button__style}
        title="취소"
        type="outline"
        onPress={toggleStatus}
      />
      <Button
        containerStyle={styles.overlay__button__style}
        title="확인"
        type="solid"
        onPress={changeStatusMessage}
      />
    </View>
  </View>
</Overlay>;
