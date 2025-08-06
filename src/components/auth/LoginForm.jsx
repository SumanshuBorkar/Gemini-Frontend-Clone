import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCredentials,
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
} from '../../redux/authSlice';
import CountryCodeSelector from './CountryCodeSelector';
import { toast } from 'react-toastify';
import './LoginForm.css';


const baseSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  countryCode: z.string().min(2, 'Country code is required'),
});
const withOtpSchema = baseSchema.extend({
  otp: z.string().length(6, 'Enter 6-digit OTP'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpSent, otpVerified, isLoading, error, success, tempOtp } = useSelector(
    (s) => s.auth
  );

  const darkMode = useSelector((state) => state.ui.darkMode);

  const schema = otpSent ? withOtpSchema : baseSchema;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    resetField,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '',
      countryCode: '+91',
      otp: '',
    },
  });

  const phone = watch('phone');
  const code = watch('countryCode');

  const handleSendOtp = () => {
    const phoneOk = phone && phone.length >= 10;
    const codeOk = code && code.length >= 2;

    if (!phoneOk || !codeOk) {
      toast.error('Enter a valid phone number and country code first.');
      return;
    }

    dispatch(setCredentials({ phone, code }));

    dispatch(sendOtpStart());

    setTimeout(() => {
      try {
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        dispatch(sendOtpSuccess({ otp })); 

        // Demo visibility
        toast.info(`${otp} is your OTP`);
        toast.success('OTP sent to your phone!');
      } catch (e) {
        dispatch(sendOtpFailure('Could not send OTP'));
        toast.error('Could not send OTP');
      }
    }, 1200);
  };

  const onVerify = (data) => {
    dispatch(verifyOtpStart());

    setTimeout(() => {
      if (data.otp === tempOtp) {
        dispatch(verifyOtpSuccess());
        toast.success('OTP verified! Logged in successfully.');
        resetField('otp');
        navigate('/dashboard', { replace: true });
      } else {
        dispatch(verifyOtpFailure('Invalid OTP'));
        toast.error('Invalid OTP. Please try again.');
      }
    }, 900);
  };

  const onPrimarySubmit = (data) => {
    if (!otpSent) {
      handleSendOtp();
      return;
    }
    onVerify(data);
  };

  return (
    <form onSubmit={handleSubmit(onPrimarySubmit)} className={`${darkMode? 'login-form dark' : 'login-form'}`}>
      <div>
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <CountryCodeSelector
              value={field.value}
              onChange={(val) => field.onChange(val)}
              className="CountryCodeSelector"
            />
          )}
        />
        {errors.countryCode && (
          <p className="error-message">{errors.countryCode.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          {...register('phone')}
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
        />
        {errors.phone && (
          <p className="error-message">{errors.phone.message}</p>
        )}
      </div>

      {otpSent && (
        <div>
          <label htmlFor="otp">OTP</label>
          <input
            {...register('otp')}
            id="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            inputMode="numeric"
            maxLength={6}
            className="otp"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
              setValue('otp', e.currentTarget.value);
            }}
          />
          {errors.otp && (
            <p className="error-message">{errors.otp.message}</p>
          )}
          <p className="info-text">
            (Demo hint: you’ll also see the OTP in a toast.)
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary"
      >
        {!otpSent ? (isLoading ? 'Sending OTP…' : 'Send OTP') : (isLoading ? 'Verifying…' : 'Verify OTP')}
      </button>

      {otpSent && !otpVerified && (
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={isLoading}
          className="btn-secondary"
        >
          {isLoading ? 'Resending…' : 'Resend OTP'}
        </button>
      )}

      {(error || success) && (
        <p className={`feedback ${error ? 'error' : 'success'}`}>
          {error || success}
        </p>
      )}
    </form>
  );
}
