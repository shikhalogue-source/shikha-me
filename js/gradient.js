/* Flowing warm gradient for the hero: a small WebGL fragment shader.
   Domain-warped noise in a sand / blush / terracotta palette that drifts
   slowly and bends toward the pointer. Falls back to a CSS gradient. */
(function () {
  const VERT = `
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    uniform vec2 uRes;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uIntro;

    // Simplex noise (Ashima Arts, MIT)
    vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
    vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
    vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    float fbm(vec2 p){
      float f = 0.0, a = 0.55;
      for (int i = 0; i < 2; i++) { f += a * snoise(p); p = p * 1.9 + vec2(1.7, 9.2); a *= 0.45; }
      return f;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      float aspect = uRes.x / uRes.y;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
      float t = uTime * 0.045;

      // pointer bends the field
      vec2 toM = p - m;
      float md = exp(-dot(toM, toM) * 3.2) * uHover;
      p += normalize(toM + 1e-4) * md * 0.12;

      // big, slow, silky shapes: low frequency + gentle domain warp
      vec2 q = vec2(fbm(p * 0.55 + vec2(0.0, t)), fbm(p * 0.55 + vec2(5.2, -t * 0.8)));
      vec2 r = vec2(fbm(p * 0.7 + 0.9 * q + vec2(1.7, 9.2) + t * 0.5),
                    fbm(p * 0.7 + 0.9 * q + vec2(8.3, 2.8) - t * 0.4));
      float f = fbm(p * 0.6 + 0.8 * r);

      vec3 cream   = vec3(0.976, 0.937, 0.906);
      vec3 sand    = vec3(0.925, 0.820, 0.710);
      vec3 blush   = vec3(0.950, 0.735, 0.660);
      vec3 caramel = vec3(0.850, 0.615, 0.420);
      vec3 terra   = vec3(0.760, 0.420, 0.300);

      vec3 col = cream;
      col = mix(col, sand,    smoothstep(-0.35, 0.45, f));
      col = mix(col, blush,   smoothstep(0.0, 0.6, r.y) * 0.8);
      col = mix(col, caramel, smoothstep(0.1, 0.7, q.x + r.x * 0.5) * 0.6);
      col = mix(col, terra,   smoothstep(0.35, 0.85, f + r.x * 0.4) * 0.45);

      // keep the edges and the area behind the nav quiet & readable
      float vign = smoothstep(0.35, 1.05, length((uv - vec2(0.5, 0.48)) * vec2(1.05, 1.25)));
      col = mix(col, cream, vign * 0.75);
      col = mix(col, cream, smoothstep(0.82, 1.0, uv.y) * 0.8);
      col = mix(col, cream, smoothstep(0.32, 0.0, uv.y) * 0.85);

      // intro: fade in from plain cream
      col = mix(cream, col, uIntro);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function create(canvas) {
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) {
      canvas.style.background = 'radial-gradient(60% 55% at 50% 50%, #f1c2b0 0%, #edd5bb 45%, #f9efe7 80%)';
      return { intro() {}, destroy() {} };
    }
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, 'uRes'),
      time: gl.getUniformLocation(prog, 'uTime'),
      mouse: gl.getUniformLocation(prog, 'uMouse'),
      hover: gl.getUniformLocation(prog, 'uHover'),
      intro: gl.getUniformLocation(prog, 'uIntro'),
    };

    // The gradient is soft, so render at reduced resolution for speed.
    const SCALE = 0.5;
    function resize() {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(u.res, w, h);
    }

    const mouse = { x: 0.5, y: 0.45, tx: 0.5, ty: 0.45, h: 0, th: 0 };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
      mouse.th = 1;
    };
    const onLeave = () => { mouse.th = 0; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    let visible = true, raf = 0, intro = 0, introTarget = 0, introStart = 0, last = performance.now();
    const start = performance.now() - 8000; // start mid-flow, not from zero
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const INTRO_MS = 1800;

    function frame(now) {
      raf = 0;
      resize();
      // frame-rate independent smoothing
      const dt = Math.min(100, now - last); last = now;
      const k = (rate) => 1 - Math.pow(1 - rate, dt / 16.67);
      mouse.x += (mouse.tx - mouse.x) * k(0.045);
      mouse.y += (mouse.ty - mouse.y) * k(0.045);
      mouse.h += (mouse.th - mouse.h) * k(0.03);
      if (introTarget) {
        const p = Math.min(1, (now - introStart) / INTRO_MS);
        intro = 1 - Math.pow(1 - p, 3);
      }
      gl.uniform1f(u.time, reduce ? 20.0 : (now - start) / 1000);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.uniform1f(u.hover, mouse.h);
      gl.uniform1f(u.intro, intro);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !(reduce && Math.abs(introTarget - intro) < 0.001)) raf = requestAnimationFrame(frame);
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(canvas);
    window.addEventListener('resize', kick);
    kick();

    return {
      intro() { if (!introTarget) { introTarget = 1; introStart = performance.now(); } kick(); },
      destroy() { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); },
    };
  }

  window.HeroGradient = { create };
})();
