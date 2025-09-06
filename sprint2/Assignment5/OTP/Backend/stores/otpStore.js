const otpMap = new Map(); 

const setOtp = (key, otp, ttlSeconds = 300) => {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  otpMap.set(key, { otp, expiresAt });
};

const getOtp = (key) => {
  const entry = otpMap.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    otpMap.delete(key);
    return null;
  }
  return entry.otp;
};

const deleteOtp = (key) => otpMap.delete(key);

module.exports = {
  setOtp,
  getOtp,
  deleteOtp
};
