// 以 iOS 为例子 

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // 设置缓存大小为10MB
        let cacheSizeMemory = 10 * 1024 * 1024 // 10MB
        let cacheSizeDisk = 100 * 1024 * 1024 // 100MB
        let sharedCache = URLCache(memoryCapacity: cacheSizeMemory, diskCapacity: cacheSizeDisk, diskPath: "urlCache")
        URLCache.shared = sharedCache
        return true
    }
}
