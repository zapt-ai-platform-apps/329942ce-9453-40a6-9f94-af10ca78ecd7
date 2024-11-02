import { createSignal, Show } from 'solid-js';
import { createEvent } from './supabaseClient';

function App() {
  const [loading, setLoading] = createSignal(false);
  const [textInput, setTextInput] = createSignal('');
  const [audioUrl, setAudioUrl] = createSignal('');
  const [imageFile, setImageFile] = createSignal(null);
  const [imageDescription, setImageDescription] = createSignal('');
  const [highContrast, setHighContrast] = createSignal(false);

  const handleReadAloud = async () => {
    if (!textInput()) return;
    setLoading(true);
    try {
      const result = await createEvent('text_to_speech', {
        text: textInput()
      });
      setAudioUrl(result);
    } catch (error) {
      console.error('Error converting text to speech:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDescribeImage = async () => {
    if (!imageFile()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile());
      const uploadResponse = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData
      });
      const { imageUrl } = await uploadResponse.json();

      const result = await createEvent('chatgpt_request', {
        prompt: `وصف الصورة في هذا الرابط: ${imageUrl}`,
        response_type: 'text'
      });
      setImageDescription(result);
    } catch (error) {
      console.error('Error describing image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" class={`min-h-screen ${highContrast() ? 'bg-black text-white' : 'bg-white text-black'} p-4`}>
      <div class="max-w-4xl mx-auto h-full flex flex-col">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">خدمات إمكانية الوصول للمكفوفين</h1>
        </div>

        <div class="flex space-x-4 mb-8">
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={highContrast()}
              onChange={() => setHighContrast(!highContrast())}
              class="cursor-pointer"
            />
            <span class="font-semibold">وضع التباين العالي</span>
          </label>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          <div class="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">تحويل النص إلى كلام</h2>
            <textarea
              placeholder="أدخل النص هنا..."
              value={textInput()}
              onInput={(e) => setTextInput(e.target.value)}
              class="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            ></textarea>
            <button
              onClick={handleReadAloud}
              class={`mt-4 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading()}
            >
              <Show when={loading() && !audioUrl()}>جاري المعالجة...</Show>
              <Show when={!loading() || audioUrl()}>قراءة بصوت عالٍ</Show>
            </button>
            <Show when={audioUrl()}>
              <div class="mt-4">
                <h3 class="text-xl font-bold mb-2 text-purple-600">الناتج الصوتي</h3>
                <audio controls src={audioUrl()} class="w-full" />
              </div>
            </Show>
          </div>

          <div class="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">وصف الصورة</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
            />
            <button
              onClick={handleDescribeImage}
              class={`mt-4 w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading()}
            >
              <Show when={loading() && !imageDescription()}>جاري المعالجة...</Show>
              <Show when={!loading() || imageDescription()}>وصف الصورة</Show>
            </button>
            <Show when={imageDescription()}>
              <div class="mt-4">
                <h3 class="text-xl font-bold mb-2 text-purple-600">وصف الصورة</h3>
                <p>{imageDescription()}</p>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;