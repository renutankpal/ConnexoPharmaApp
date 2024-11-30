package com.awesomeproject;

import android.content.Context;
import com.facebook.flipper.android.AndroidFlipperClient;
import com.facebook.flipper.android.utils.FlipperUtils;
import com.facebook.flipper.core.FlipperClient;
import com.facebook.flipper.plugins.databases.DatabasesFlipperPlugin;
import com.facebook.flipper.plugins.inspector.DescriptorMapping;
import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin;
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor;
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.network.NetworkingModule;

public class ReactNativeFlipper {
    public static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (FlipperUtils.shouldEnableFlipper(context)) {
            FlipperClient client = AndroidFlipperClient.getInstance(context);
            client.addPlugin(new InspectorFlipperPlugin(context, DescriptorMapping.withDefaults()));
            client.addPlugin(new DatabasesFlipperPlugin(context));

            // Add network plugin
            NetworkFlipperPlugin networkPlugin = new NetworkFlipperPlugin();
            NetworkingModule.setCustomClientBuilder(
                builder -> builder.addNetworkInterceptor(new FlipperOkhttpInterceptor(networkPlugin))
            );
            client.addPlugin(networkPlugin);

            client.start();
        }
    }
}
