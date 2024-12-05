package com.awesomeproject;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class VpnDetectorModule extends ReactContextBaseJavaModule {

    public VpnDetectorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "VpnDetector";
    }

    @ReactMethod
    public void isVpnConnected(Promise promise) {
        try {
            boolean vpnInUse = false;
            ConnectivityManager connectivityManager =
                (ConnectivityManager) getReactApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                NetworkCapabilities capabilities =
                    connectivityManager.getNetworkCapabilities(connectivityManager.getActiveNetwork());
                if (capabilities != null) {
                    vpnInUse = capabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN);
                }
            }

            promise.resolve(vpnInUse);
        } catch (Exception e) {
            promise.reject("VPN_DETECTION_ERROR", e);
        }
    }
}
