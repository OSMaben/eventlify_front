export default function Graphics() {
    return (
        <div class="flex flex-row flex-wrap flex-grow mt-0">
            <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                <div class="bg-white border-transparent rounded-lg shadow-xl">
                    <div class="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                        <h class="font-bold uppercase text-gray-600">Graph</h>
                    </div>
                    <div class="p-5">
                        <canvas id="chartjs-7" class="chartjs" width="undefined" height="undefined"></canvas>

                    </div>
                </div>
            </div>
        </div>
    )
}