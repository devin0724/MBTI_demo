import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SafeImage from './SafeImage.vue'

describe('SafeImage Component', () => {
  const mockSrc = 'https://example.com/image.jpg'
  const mockAlt = 'Test Image'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render loading state initially', () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    expect(wrapper.find('.image-loading').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.image-error').exists()).toBe(false)
  })

  it('should display image when loaded successfully', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    const internal = wrapper.vm as any
    internal.handleLoad()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.image-loading').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('.image-error').exists()).toBe(false)
  })

  it('should display error state when image fails to load', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    const internal = wrapper.vm as any
    internal.handleError()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.image-loading').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.image-error').exists()).toBe(true)
    expect(wrapper.find('.error-text').text()).toBe('图片加载失败')
  })

  it('should emit load event when image loads successfully', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    const internal = wrapper.vm as any
    internal.handleLoad()
    await wrapper.vm.$nextTick()

    const loadEvent = wrapper.emitted('load')
    expect(loadEvent).toBeTruthy()
    expect(loadEvent?.length).toBe(1)
  })

  it('should emit error event when image fails to load', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    const internal = wrapper.vm as any
    internal.handleError()
    await wrapper.vm.$nextTick()

    const errorEvent = wrapper.emitted('error')
    expect(errorEvent).toBeTruthy()
    expect(errorEvent?.length).toBe(1)
  })

  it('should apply custom width and height', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt,
        width: 200,
        height: 200
      }
    })

    const internal = wrapper.vm as any
    internal.handleLoad()
    await wrapper.vm.$nextTick()

    const img = wrapper.find('img')
    expect(img.element.style.width).toBe('200px')
    expect(img.element.style.height).toBe('200px')
  })

  it('should apply custom class name', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt,
        className: 'custom-class'
      }
    })

    const internal = wrapper.vm as any
    internal.handleLoad()
    await wrapper.vm.$nextTick()

    const img = wrapper.find('img')
    expect(img.classes()).toContain('custom-class')
  })

  it('should display alt text for accessibility', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    const internal = wrapper.vm as any
    internal.handleLoad()
    await wrapper.vm.$nextTick()

    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe(mockAlt)
  })

  it('should handle string width and height values', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt,
        width: '100%',
        height: 'auto'
      }
    })

    const internal = wrapper.vm as any
    internal.handleLoad()
    await wrapper.vm.$nextTick()

    const img = wrapper.find('img')
    expect(img.element.style.width).toBe('100%')
    expect(img.element.style.height).toBe('auto')
  })

  it('should have has-error class when image fails', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    const internal = wrapper.vm as any
    internal.handleError()
    await wrapper.vm.$nextTick()

    expect(wrapper.classes()).toContain('has-error')
  })

  it('should have correct initial state', () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    expect(wrapper.find('.spinner').exists()).toBe(true)
    expect(wrapper.find('.loading-text').text()).toBe('加载中...')
  })

  it('should retry loading when retry button is clicked', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    const internal = wrapper.vm as any
    internal.handleError()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.image-error').exists()).toBe(true)
    
    const retryBtn = wrapper.find('.retry-btn')
    await retryBtn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.image-loading').exists()).toBe(true)
    expect(wrapper.find('.image-error').exists()).toBe(false)
  })

  it('should show retry button when error occurs', async () => {
    const wrapper = shallowMount(SafeImage, {
      props: {
        src: mockSrc,
        alt: mockAlt
      }
    })

    const internal = wrapper.vm as any
    internal.handleError()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.retry-btn').exists()).toBe(true)
  })
})
