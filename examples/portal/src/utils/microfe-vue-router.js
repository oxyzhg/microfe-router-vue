export default class PortalRouter {
  /**
   *Creates an instance of PortalRouter.
   * @param {*} router portal router configuration
   * @param {*} mount route configuration of mount point for submodule routes. path and component must be included.
   * @param {*} prefix the prefix for submodule routes
   * @memberof PortalRouter
   */
  constructor(router, mount, prefix) {
    this.r = router;
    this.m = mount;
    this.p = prefix;
    this.prefix = '/plugins';
  }

  register(options, appName) {
    // console.log(options);
    const _routes = this.formatRoutes(options, appName);
    this.r.addRoutes(_routes);
  }

  formatRoutes(options, appName) {
    const _mount = this.detectMount();
    if (!_mount) return;
    const _routes = options.routes.map(el => {
      const _p = true;
      const path = this.formatPath(appName, el.path);
      const meta = el.hasOwnProperty('meta') ? { ...el.meta, _p } : { _p };
      return Object.assign(el, { path, meta });
    });

    // console.log(_routes);

    return [
      {
        ..._mount,
        children: _mount.hasOwnProperty('children')
          ? [..._mount.children, ..._routes]
          : _routes
      }
    ];
  }

  detectMount(routes = this.r.options.routes) {
    if (!this.m.hasOwnProperty('path')) return;

    for (let route of routes) {
      if (
        route.path === this.m.path ||
        (route.hasOwnProperty('children') && this.detectMount(route.children))
      ) {
        return route;
      }
    }

    return null;
  }

  formatPath(appName, path) {
    return `${this.p}/${appName}${path}`;
  }
}
